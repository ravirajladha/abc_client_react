import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Split from "react-split";
import { classnames } from "../utils/general";
// import "../../../App.css";

import Timer from "./Timer";
import useLabDetails from "../hooks/useLabDetails";
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";

import SettingsModal from "./SettingsModal";
import Dropdown from "./Dropdown";

import useKeyPress from "../hooks/useKeyPress";

import CodeEditorWindow from "./CodeEditorWindow";
import { defineTheme } from "../lib/defineTheme";

import axios from "axios";
import ThemeDropdown from "./ThemeDropdown";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import OutputDetails from "./OutputDetails";
import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";
import Accordion from "./Accordion";
import { useContext } from "react";

import { AuthContext } from "../../../lib/AuthContext.js";
import BackButton from "../../../components/navigation/BackButton";

function Editor1() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [code, setCode] = useState("Editor Loading...");
  const [activeTab, setActiveTab] = useState("testcases");
  const [messages, setMessages] = useState([]);
  // const [testCases, setTestCases] = useState([]);
  // const [harnessCode, setHarnessCode] = useState();
  // const [labs, setLabs] = useState({ testcase: [] });
  const user_detail = useContext(AuthContext).user.user;
  const { type, redirecting_id, type_id, labId } = useParams();
  const navigate = useNavigate();

  // If labId is undefined, set a default value
  // const effectiveLabId = labId || "26";

  const effectiveLabId = labId;

  const [selectedLevel, setSelectedLevel] = useState("Level 1");
  const handleLevelChange = (level) => {
    setSelectedLevel(level);
    // Optionally, you can fetch the lab details again here if needed
  };

  // const [code, setCode] = useState("Editor Loading...");
  useEffect(() => {
    // console.log("The code has been updated:", code);
  }, [code]);

  const [customInputValue, setCustomInputValue] = useState("");

  // Function to handle changes in the custom input box
  const handleCustomInputChange = (value) => {
    setCustomInputValue(value); // Update the state with the new value

    // Perform any checks you need on the input. For example:
    if (value.trim() !== "") {
      console.log("Custom input is filled");
    } else {
      console.log("Custom input is empty");
    }
  };

  const { labs, testCases, harnessCode, languageId, error } = useLabDetails(
    effectiveLabId,
    selectedLevel,
    setCode
  );

  useEffect(() => {
    if (error) {
      console.error("Error fetching lab details:", error);
      // Handle the error state here, such as showing a message to the user
    }
    // You can also handle any other effects that need to run when labs, testCases, or harnessCode changes
  }, [effectiveLabId, selectedLevel, error]);

  // console.log(error);
  const notify = (message) => toast(message);

  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState(languageId);
  // console.log("langauage", language);
  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");
  const languageMapping = {
    62: "Java",
    71: "Python",
    75: "C",
    82: "Sql",
  };

  const [selectedOption1, setSelectedOption1] = useState("Java");
  useEffect(() => {
    if (error) {
      console.error("Error fetching lab details:", error);
      // Handle the error state here, such as showing a message to the user
    }
    // Synchronize the language state with the fetched language ID
    setLanguage(languageId);
    if (languageId) {
      const languageName = languageMapping[languageId.id]; // Assuming languageId is an object with an 'id' property
      if (languageName) {
        setSelectedOption1(languageName);
      }
    }
  }, [languageId, error]);

  useEffect(() => {
    console.log("language", language);
  }, [language]);
  const [testResults, setTestResults] = useState([]);
  //saving the code to the database
  //   const [allTestCasesPassed, setAllTestCasesPassed] = useState(false);

  const [allTestCasesPassed, setAllTestCasesPassed] = useState(false);
  const [timerTime, setTimerTime] = useState(0);
  //store the timestamp, when the page was loaded, start_timestamp
  const [startTimestamp, setStartTimestamp] = useState(null);
  const [submissionTimestamp, setSubmissionTimestamp] = useState(null);

  const formatDateForBackend = (date) => {
    const pad = (num) => num.toString().padStart(2, "0");
    return (
      [
        date.getFullYear(),
        pad(date.getMonth() + 1), // Months are 0-indexed in JavaScript
        pad(date.getDate()),
      ].join("-") +
      " " +
      [
        pad(date.getHours()),
        pad(date.getMinutes()),
        pad(date.getSeconds()),
      ].join(":")
    );
  };
  const handleSubmitCode = async () => {
    if (!allTestCasesPassed) {
      console.error("Not all test cases have passed.");
      return;
    }
    // setSubmissionTimestamp(new Date().toISOString());

    const formattedStartTimestamp = formatDateForBackend(
      new Date(startTimestamp)
    );
    const formattedEndTimestamp = formatDateForBackend(new Date());

    // Prepare the data to be sent
    const dataToSend = {
      code: code,
      lab_id: effectiveLabId,
      language: language.id,
      status: outputDetails?.status?.description,
      memory: outputDetails?.memory,
      time: outputDetails?.time,
      level: selectedLevel,
      time_taken: timerTime,
      start_timestamp: formattedStartTimestamp,
      end_timestamp: formattedEndTimestamp,
      type: type,
      type_id: type_id,
      user_id: user_detail.id,

      // The code from the code editor
      // ... include any other data you need to send
    };
    console.log("datatosend", dataToSend);
    try {
      const response = await axios.post(
        baseUrl + "api/submit_code",
        dataToSend,
        {
          headers: {
            "Content-Type": "application/json",
            // Include other headers as needed, like authorization tokens
          },
        }
      );
      setAllTestCasesPassed(false);
      console.log("passed");
      toast.success(
        "Code submitted successfully. You are redirecting back...",
        {
          onClose: () => handleRedirection(type), // Redirect after toast closes
          autoClose: 5000, // Toast will close after 5 seconds
        }
      );
    } catch (error) {
      // Handle errors here
      console.error("Failed to submit code:", error);
    }
  };

  const handleRedirection = (type) => {
    let redirectPath =
      type === 1
        ? `/subject_stream/view_project/${redirecting_id}`
        : `/subject_stream/${redirecting_id}`;

    navigate(redirectPath);
  };

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress);
      console.log("ctrlPress", ctrlPress);
      handleCompile();
    }
  }, [ctrlPress, enterPress]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const processCompilation = async (encodedCode, inputVariables, testId) => {
    const formData = {
      language_id: language.id,
      source_code: encodedCode,
      stdin: btoa(inputVariables), // Encode input variables
    };

    const options = {
      method: "POST",
      url: process.env.REACT_APP_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
      data: formData,
    };

    try {
      const response = await axios.request(options);
      const token = response.data.token;
      const result = await checkStatus(token, testId); // Modify checkStatus if needed to handle custom input
      return { testId, ...result };
    } catch (err) {
      console.error("Error during compile request for test case:", testId, err);
      return { testId, error: err.message };
    }
  };
  //handlecompile function starts
  const handleCompile = async () => {
    setProcessing(true);
    setMessages([]);
    const testResults = [];
    let finalCode = "";
    if (language.id == 62) {
      // Prepare code for compilation
      const trimmedCode = code.trim().replace(/}\s*$/, "");
      finalCode = `
  import java.util.Scanner;
  
  ${trimmedCode} // User's code with the extra brace removed
  
  ${harnessCode} // The data harness code
    `.trim();
    } else if (language.id == 75) {
      const userFunction = code.trim();

      // Prepare the full C code for compilation
      finalCode = `
#include <stdio.h>
char roman[1000]; // Global variable to store the Roman numeral

${userFunction} // User's code

int main() {
    int number;
    scanf("%d", &number);
    intToRoman(number, roman);
    printf("%s", roman);
    return 0;
}
`.trim();
    } else if (language.id == 71) {
      // Prepare Python code for compilation
      const userFunction = code.trim();

      // Prepare the full Python code for compilation
      finalCode = `
${userFunction} # User's code

if __name__ == "__main__":
  number = int(input())
  roman = intToRoman(number)
  print(roman)
`.trim();
    }  else if (language.id == 82) {
      // Prepare Python code for compilation
      const userFunction = code.trim();

      // Prepare the full Python code for compilation
      finalCode = userFunction ;
}else {
      console.log("error in deciding language");
      setProcessing(false);
      return; // Exit the function if language is not recognized
    }
    const encodedFinalCode = btoa(finalCode);
    console.log(finalCode);
    // Process test cases
    if (labs && Array.isArray(labs.testcase)) {
      for (const test of labs.testcase) {
        const inputVariables = test.variables.map((v) => v.value).join("\n");
        const testCaseResult = await processCompilation(
          encodedFinalCode,
          inputVariables,
          test
        );
        // testCaseResult.passed = testCaseResult.output.trim() === test.expected_output.trim();
        testResults.push(testCaseResult);
      }
    } else {
      console.error("No test cases are defined.");
    }

    // Process custom input if present
    if (customInputValue.trim() !== "") {
      const customResult = await processCompilation(
        encodedFinalCode,
        customInputValue,
        "custom"
      );
      testResults.push(customResult);
    }

    // Check if all test cases passed (excluding custom input)
    const allPassed = testResults.every((result) => result.passed);

    // Enable the "Submit Code" button if all test cases passed
    setAllTestCasesPassed(allPassed);
    setTestResults(testResults); // Update the state with all test case results
    setProcessing(false);
    // Handle the testResults as needed...
  };

  const checkStatus = async (token, test) => {
    // Ensure the test object is defined
    if (!test || typeof test.expected_output === "undefined") {
      console.error("The test object is undefined or lacking expected output.");
      return;
    }
    // console.log(test);
    try {
      let done = false;
      let output = "";
      //   setMessages([]);
      while (!done) {
        // Set up the request options for the GET request
        const options = {
          method: "GET",
          url: `${process.env.REACT_APP_RAPID_API_URL}/${token}`,
          headers: {
            "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
            "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
          },
        };

        // Send the request to check the compilation status
        const response = await axios.request(options);
        const statusId = response.data.status?.id;

        // If the status indicates processing, wait and check again
        if (statusId === 1 || statusId === 2) {
          // Assuming 1 and 2 indicate "processing"
          await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 2 seconds
          continue;
        }

        // Processing is complete; get the output
        done = true;
        if (response.data.stdout) {
          output = response.data.stdout;

          setOutputDetails(response.data);
          setActiveTab("output"); // Make the output accordion active
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              type: "output",
              text: `Testcase ${prevMessages.length + 1} Output: ${output}`,
            },
          ]); // Add the new output to the messages
        } else {
          console.error("No stdout in the response:", response.data);
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              type: "error",
              text: `Error: No stdout in the response: ${response.data.compile_output}`,
            },
          ]); // Add the error to the messages
        }
      }

      setProcessing(false);
      const actualOutput = output.trim();
      const expectedOutput = test.expected_output?.trim();
      //   const passed = actualOutput === expectedOutput;
      // console.log(actualOutput, expectedOutput);

      // Compare the output
      // console.log(
      //   `Actual output: '${output.trim()}', Expected output: '${test.expected_output.trim()}'`
      // );
      if (output.trim() === test.expected_output.trim()) {
        // Success notification logic
        // console.log(`Test case ${test.id} passed!`);
      } else {
        // Error notification logic
        // console.error(
        //   `Test case ${test.id} failed! Expected ${test.expected_output}, got ${output}`
        // );
      }
      // Once you have the output:
      const passed = output.trim() === test.expected_output.trim();
      //   setTestResults((prevResults) => ({
      //     ...prevResults,
      //     [test.id]: passed, // Store boolean result by test id
      //   }));
      if (passed) {
        showSuccessToast(`Test case ${test.id} passed!`);
      } else {
        showErrorToast(
          `Test case ${test.id} failed! Expected ${test.expected_output}, got ${output}`
        );
      }
      return { output, passed };
    } catch (err) {
      // Handle errors from the GET request
      showErrorToast(`"Error during status check:", err`);
      // console.error("Error during status check:", err);
      setProcessing(false);
    }
  };

  function handleThemeChange(th) {
    const theme = th;
    // console.log("theme...", theme);

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme));
    }
  }

  useEffect(() => {
    defineTheme("oceanic-next").then((_) =>
      setTheme({ value: "oceanic-next", label: "Dark" })
    );
  }, []);

  const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const showErrorToast = (msg, timer) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: timer ? timer : 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  //end from the manu arora code editor

  //   const [selectedOption3, setSelectedOption3] = useState("10 px");
  const [selectedFontSize, setSelectedFontSize] = useState("14"); // Default font size

  // Function to handle font size change
  const handleFontSizeChange = (size) => {
    setSelectedFontSize(size.replace(/ px$/, "")); // Remove the " px" to get the number value
  };
  const [activeTestCaseId, setActiveTestCaseId] = useState(null);

  // modal javascript
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [settings, setSettings] = useState({
    settingsModalIsOpen: false,
    dropdownIsOpen: false,
    fontSize: "16px",
  });

  const handleFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  useEffect(() => {
    function exitHandler(e) {
      if (!document.fullscreenElement) {
        setIsFullScreen(false);
        return;
      }
      setIsFullScreen(true);
    }

    document.addEventListener("fullscreenchange", exitHandler);
    document.addEventListener("webkitfullscreenchange", exitHandler);
    document.addEventListener("mozfullscreenchange", exitHandler);
    document.addEventListener("MSFullscreenChange", exitHandler);

    return () => {
      document.removeEventListener("fullscreenchange", exitHandler);
      document.removeEventListener("webkitfullscreenchange", exitHandler);
      document.removeEventListener("mozfullscreenchange", exitHandler);
      document.removeEventListener("MSFullscreenChange", exitHandler);
    };
  }, [isFullScreen]);

  return (
    <div>
      <nav className="relative flex h-[50px] w-full shrink-0 items-center px-5 bg-white text-dark-gray-7">
        <div
          className={`flex w-full items-center justify-between  "max-w-[1200px] mx-auto" `}
        >
          <Link href="/" className="h-[10px] flex-1">
            <img
              src="/assets/images/abc_logo.jpg"
              alt="Logo"
              height={50}
              width={50}
            />
          </Link>
          <div className="flex items-center gap-4 flex-1 justify-center">
            {/* <div
                            className='flex items-center justify-center rounded bg-white-fill-3 hover:bg-white-fill-2 h-8 w-8 cursor-pointer'
                        >
                            <FaChevronLeft />
                        </div> */}
            <Link
              href="/"
              className="flex items-center gap-2 font-medium text-dark-gray-8 cursor-pointer"
            >
              <p className="text-black">
                {labs.name}
                {/* {console.log(process.env.REACT_APP_RAPID_API_URL)} */}
              </p>
            </Link>
            {/* <div
                            className='flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer'

                        >
                            <FaChevronRight />
                        </div> */}
          </div>

          <div className="flex items-center space-x-4 flex-1 justify-end ">
            {/* <div>
                            <a
                                href='https://www.buymeacoffee.com/burakorkmezz'
                                target='_blank'
                                rel='noreferrer'
                                className='bg-white-fill-3 py-1.5 px-3 cursor-pointer rounded text-brand-orange hover:bg-white-fill-2'
                            >
                                Premium
                            </a>
                        </div> */}

            {/* <button className='bg-white-fill-3 py-1 px-2 cursor-pointer rounded '>Sign In</button> */}
            <Timer
              onTimeUpdate={setTimerTime}
              onStartTimestamp={setStartTimestamp}
            />

            <div className="cursor-pointer group relative">
              <img
                src="/avatar.png"
                alt="Avatar"
                width={30}
                height={30}
                className="rounded-full"
                onClick={() => notify("The functionality in progress!")}
              />
              <ToastContainer />
              <div
                className="absolute top-10 left-2/4 -translate-x-2/4  mx-auto bg-white-layer-1 text-brand-orange p-2 rounded shadow-lg 
								z-40 group-hover:scale-100 scale-0 
								transition-all duration-300 ease-in-out"
              >
                <p className="text-sm"></p>
              </div>
            </div>
            <BackButton />

            {/* {user && <Logout />} */}
          </div>
        </div>
      </nav>
      <Split className="split " minSize={0}>
        <Accordion labs={labs} />

        {/* pd ends */}
        <div className="bg-white-fill-2  ">
          {/* //playground start */}

          <div className="flex flex-col bg-white-layer-1 relative overflow-x-hidden  ">
            {/* preference nav starts */}
            <div className="flex items-center justify-between text-black bg-white-layer-2 h-50 w-full  bg-gray-100 font-semibold">
              {/* <div className='flex items-center text-black'> */}
              {/* <button className='flex cursor-pointer items-center rounded focus:outline-none bg-white-fill-3 text-dark-label-2 hover:bg-white-fill-2  px-2 py-1.5 font-medium'>
                                    <div className='flex items-center px-1'>
                                        <div className='text-xs text-label-2 dark:text-white-label-2 text-black'> 
                                       
                                         </div>
                                      

                                    </div>
                                </button> */}

              <Dropdown
                options={["Java", "Python", "C", "Sql"]}
                placeholder="Select Technology"
                selected={selectedOption1}
                handleOptionClick={(value) => {
                  // Do nothing or perform additional logic if necessary
                  // This is where you ensure that the dropdown does not change unless you want it to
                }}
              />

              {/* </div> */}
              <ThemeDropdown
                handleThemeChange={handleThemeChange}
                theme={theme}
              />
              <Dropdown
                options={["Level 1", "Level 2"]}
                placeholder="Select Level"
                selected={selectedLevel}
                handleOptionClick={handleLevelChange}
              />

              <Dropdown
                options={["10 px", "12 px", "14 px", "16 px", "18 px", "20 px"]}
                placeholder="Select Font Size"
                selected={`${selectedFontSize} px`} // Add " px" for display consistency
                handleOptionClick={handleFontSizeChange}
              />
              <div className="flex items-center mb-4 gap-2 ">
                {/* <button
					className='preferenceBtn group'
					
				>
					<div className='h-4 w-4 text-dark-gray-6 font-bold text-lg'>
						<AiOutlineSetting />
					</div>
					<div className='preferenceBtn-tooltip'>Settings</div>
				</button> */}

                {/* <Dropdown
                                    options={["Light", "Dark"]}
                                    placeholder="Select Technology"
                                    selected={selectedOption2}
                                    handleOptionClick={setSelectedOption1}
                                /> */}

                {/* <button
                                    className='preferenceBtn group'
                                    onClick={() => setSettings({ ...settings, settingsModalIsOpen: true })}
                                >
                                    <div className='h-4 w-4 text-dark-gray-6 font-bold text-lg'>
                                        <AiOutlineSetting />
                                    </div>
                                    <div className='preferenceBtn-tooltip'>Settings</div>
                                </button> */}

                <button
                  className="preferenceBtn group"
                  onClick={handleFullScreen}
                >
                  <div className="h-4 w-4 text-dark-gray-6 font-bold text-lg">
                    {!isFullScreen ? (
                      <AiOutlineFullscreen />
                    ) : (
                      <AiOutlineFullscreenExit />
                    )}
                  </div>
                  <div className="preferenceBtn-tooltip">Full Screen</div>
                </button>
              </div>
              {settings.settingsModalIsOpen && (
                <SettingsModal settings={settings} setSettings={setSettings} />
              )}
            </div>

            {/* preference nav ends */}

            <Split
              className="h-[calc(100vh-94px)] bg-white"
              direction="vertical"
              sizes={[50, 40]}
              minSize={50}
            >
              <div className="w-full overflow-auto bg-black">
                {/* <CodeMirror
                                    value={javaSampleCode}
                                    // them="vscodeLight "
                                    theme={basicLight}
                                    // theme={eclipse }
                                    // theme={myTheme}
                                    // theme="vscodeLight"
                                    onChange={true} // This should probably be a function instead of a boolean value.
                                    extensions={[java()]}
                                    style={{ fontSize: "14px" }}  // Fixing the style prop
                                /> */}

                {/* <CodeEditorWindow
                                        code={code}
                                        key={Date.now()}
                                        onChange={newCode => setCode(newCode)}
                                        language={language?.value}
                                        theme={theme.value}
                                    /> */}

                {/* <CodeEditorWindow
                                    code={code}
                                    onChange={handleCodeChange}
                                    language={language?.value}
                                    theme={theme.value}
                                /> */}

                <CodeEditorWindow
                  code={code}
                  onChange={(action, value) => {
                    if (action === "code") {
                      handleCodeChange(value);
                    }
                  }}
                  language={language?.value}
                  theme={theme.value}
                  fontSize={parseInt(selectedFontSize, 14)}
                />
              </div>
              <div className="w-full px-5 overflow-auto">
                {/* <div className='flex h-10 items-center space-x-'>
                                    <div className='relative flex h-full flex-col justify-center cursor-pointer'>
                                        <div className='text-sm font-medium leading-5 text-black'>Testcases</div>
                                        <hr className='absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white' />
                                    </div>
                                </div> */}

                {/* <div className="flex flex-col items-end">

                                    <div className='font-semibold my-4'>
                                        <p className='text-sm font-medium mt-4 text-black'>Output:</p>
                                        <div className='w-full cursor-text rounded-lg border px-3 py-[6px] bg-gray-100  border-transparent text-black mt-3'>
                                            <OutputWindow defaultOutput={defaultOutput} customOutput={customOutput} />
                                        </div>

                                        <p className='text-sm font-medium mt-1 text-black'>Input:</p>
                                        <div className='w-full cursor-text rounded-lg border px-3 py-[6px] bg-gray-100  border-transparent text-black mt-3'>
                                           
                                            <CustomInput
                                                customInput={customInput}
                                                setCustomInput={setCustomInput}
                                            />

                                        </div>
                                    </div>



                                </div> */}
                <div className="w-full px-1 overflow-auto">
                  <div className="flex h-10 items-center space-x-2 mb-2">
                    <div
                      className={`relative flex h-full flex-col justify-center cursor-pointer ${
                        activeTab === "testcases" ? "font-bold" : "font-medium"
                      }`}
                      onClick={() => setActiveTab("testcases")}
                    >
                      <div className="text-sm leading-5 text-black">
                        Testcases
                      </div>
                      <hr className="absolute bottom-0 h-0.5 w-full rounded-full border-none bg-black" />
                    </div>

                    {/* Output Tab */}
                    <div
                      className={`relative flex h-full flex-col justify-center cursor-pointer ml-4 ${
                        activeTab === "output" ? "font-bold" : "font-medium"
                      }`}
                      onClick={() => setActiveTab("output")}
                    >
                      <div className="text-sm leading-5 text-black">Output</div>
                      <hr className="absolute bottom-0 h-0.5 w-full rounded-full border-none bg-black" />
                    </div>
                  </div>
                  {/* Test Cases Navigation */}
                  {activeTab === "testcases" && (
                    <>
                      <div className="flex flex-wrap items-center gap-y-4">
                        {testCases.map((example, index) => (
                          <div
                            className={`font-medium items-center transition-all focus:outline-none inline-flex gap-4 mr-2 ${
                              testResults[example.id]
                                ? "bg-white"
                                : "bg-gray-100"
                            } hover:bg-white-fill-2 relative rounded-md px-4 py-1 cursor-pointer whitespace-nowrap
                          ${
                            activeTestCaseId === index
                              ? "bg-white"
                              : "bg-gray-100"
                          }
                          `}
                            key={example.id}
                            onClick={() => {
                              // console.log(`Test case index clicked: ${index}`);

                              setActiveTestCaseId(index);
                            }}
                          >
                            Case {index + 1}
                          </div>
                        ))}

                        <div
                          className={`font-medium items-center transition-all focus:outline-none inline-flex gap-4 mr-2 ${
                            activeTestCaseId === "custom"
                              ? "bg-white"
                              : "bg-gray-100"
                          } hover:bg-white-fill-2 relative rounded-md px-4 py-1 cursor-pointer whitespace-nowrap
    `}
                          onClick={() => setActiveTestCaseId("custom")}
                        >
                          Custom Input
                        </div>
                      </div>
                      {labs.testcase &&
                        labs.testcase.length > 0 &&
                        activeTestCaseId != "custom" && (
                          <div className="font-semibold my-4">
                            <p className="text-sm font-medium mt-1 text-black">
                              Input:
                            </p>
                            <div className="w-full cursor-text rounded-lg border px-3 py-[6px] bg-gray-100 border-transparent text-black mt-3">
                              {labs.testcase[activeTestCaseId]?.variables
                                .map((variable) => variable.value)
                                .join(" ")}
                            </div>
                            <p className="text-sm font-medium mt-4 text-black">
                              Output:
                            </p>
                            <div className="w-full cursor-text rounded-lg border px-3 py-[6px] bg-gray-100 border-transparent text-black mt-3">
                              {labs.testcase[activeTestCaseId]?.expected_output}
                            </div>
                          </div>
                        )}

                      {activeTestCaseId === "custom" && (
                        // <input
                        //   type="text"
                        //   className="font-medium text-black transition-all focus:outline-none rounded-md px-4 py-1"
                        //   placeholder="Enter custom input"
                        //   // Function to handle the custom input change
                        //   onChange={(e) =>
                        //     handleCustomInputChange(e.target.value)
                        //   }
                        //   // You can also manage the value state if needed
                        // />

                        <textarea
                          rows="5"
                          className="font-medium text-black transition-all focus:outline-none rounded-md px-4 py-1 w-full mt-4 border-2 border-black"
                          placeholder="Enter custom input"
                          onChange={(e) =>
                            handleCustomInputChange(e.target.value)
                          }
                          value={customInputValue} // Assuming this is your state variable for the custom input
                        ></textarea>
                      )}
                    </>
                  )}
                  {/* Output Content */}
                  {activeTab === "output" && (
                    <>
                      <div>
                        {messages.map((message, index) => (
                          <p key={index} className="text-sm mb-2">
                            <span
                              className={`font-semibold px-2 py-1 rounded-md ${
                                message.type === "error"
                                  ? "bg-red-100 text-red"
                                  : "bg-gray-100 text-black"
                              } mr-2`}
                            >
                              {message.text}
                            </span>
                          </p>
                        ))}
                      </div>
                      {outputDetails && (
                        <OutputDetails outputDetails={outputDetails} />
                      )}
                    </>
                  )}
                  {/* <div className={`absolute bottom-20 left-0 right-0 transition-all ${isConsoleOpen ? 'h-50' : 'h-0'} overflow-hidden`}>
  <div className="bg-dark text-white w-full h-full">
    Console content goes here, perhaps a div that renders error messages
    <div className="p-4 overflow-auto">
      Dynamically add error messages here
    </div>
  </div>
</div> */}
                </div>
              </div>
            </Split>
            {/* starting editorfooter */}
            {/* bg-white-layer-1 */}
            <div className="flex b absolute bottom-0 z-10 w-full bg-gray-100 ">
              <div className="mx-5 my-[10px] flex justify-between w-full">
                {/* <div className="mr-2 flex flex-1 flex-nowrap items-center space-x-4">
                  <button
                    onClick={() => setIsConsoleOpen(!isConsoleOpen)}
                    className="px-3 py-1.5 font-medium items-center transition-all inline-flex bg-white-fill-3 text-sm hover:bg-white-fill-2 text-dark-label-2 rounded-lg pl-3 pr-2"
                  >
                    Console
                    <div className="ml-1 transform transition flex items-center">
                
                      <BsChevronUp
                        className={`fill-gray-6 mx-1 fill-dark-gray-6 ${
                          isConsoleOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>
                </div> */}

                <div className="ml-auto flex items-center space-x-4">
                  {/* <button
                                        className='px-3 py-1.5 text-sm font-medium items-center whitespace-nowrap transition-all focus:outline-none inline-flex bg-white-fill-3  hover:bg-white-fill-2 text-dark-label-2 rounded-lg'

                                    >
                                        Compile & Run
                                    </button>
                                    <button
                                        className='px-3 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex text-sm text-black bg-white-green-s hover:bg-green-3 rounded-lg'

                                    >
                                        Submit Code
                                    </button> */}
                  {/* <div className="flex flex-col items-end inline"> */}
                  <button
                    onClick={handleCompile}
                    disabled={!code}
                    className={classnames(
                      "mt-1 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
                      !code ? "opacity-50" : ""
                    )}
                  >
                    {processing ? "Processing..." : "Compile and Execute"}
                  </button>

                  <button
                    onClick={handleSubmitCode}
                    disabled={!allTestCasesPassed}
                    title={
                      !allTestCasesPassed
                        ? "All test cases must pass before submitting code."
                        : "Click to submit code."
                    }
                    className={`mt-1 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 transition duration-200 flex-shrink-0 ${
                      allTestCasesPassed
                        ? "bg-green-100 hover:bg-green-200 text-black"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Submit Code
                  </button>
                </div>
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </Split>
    </div>
  );
}

export default Editor1;
