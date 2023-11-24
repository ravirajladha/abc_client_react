import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import Split from "react-split";
import { classnames } from "../utils/general";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import {
  basicLight,
  basicLightInit,
  basicDark,
  basicDarkInit,
} from "@uiw/codemirror-theme-basic";
import Timer from "./Timer";
import { javascript } from "@codemirror/lang-javascript";
import { java } from "@codemirror/lang-java";
import { BsCheckLg, BsChevronUp } from "react-icons/bs";
import { BsCheck2Circle } from "react-icons/bs";
import {
  AiFillLike,
  AiFillDislike,
  AiOutlineLoading3Quarters,
  AiFillStar,
} from "react-icons/ai";
import {
  AiOutlineFullscreen,
  AiOutlineFullscreenExit,
  AiOutlineSetting,
} from "react-icons/ai";
import { TiStarOutline } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import SettingsModal from "./SettingsModal";
import Dropdown from "./Dropdown";
// import { vscodeLight } from "@uiw/codemirror-theme-vscode";
import useKeyPress from "../hooks/useKeyPress";
import { tags as t } from "@lezer/highlight";
// import { defaultLight } from '@codemirror/theme-default';
// import "@codemirror/theme-default";
import { createTheme } from "@uiw/codemirror-themes";
import CodeEditorWindow from "./CodeEditorWindow";
import { defineTheme } from "../lib/defineTheme";
import { languageOptions } from "../constants/languageOptions";
import axios from "axios";
import ThemeDropdown from "./ThemeDropdown";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OutputWindow from "./OutputWindow";
import CustomInput from "./CustomInput";
import OutputDetails from "./OutputDetails";
// import ThemeDropdown from "./ThemeDropdown";
import { useParams } from "react-router-dom";
{
  /* <div className='flex h-11 w-full items-center pt-2 bg-gray-400 overflow-x-hidden'>
                        <div className="bg-white rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer"> */
}

function AccordionItem({ title, children, isOpen, setIsOpen }) {
  return (
    <div className="inline-block items-center mr-10 ml-10 gap-2">
      <button
        className={`rounded-t-[5px] flex-grow text-left py-2 px-4 focus:outline-none border border-gray-300 ${
          isOpen === title
            ? "bg-gray-100 "
            : "bg-white text-gray-700 hover:bg-gray-200"
        }`}
        onClick={() => setIsOpen(title)}
      >
        {title}
      </button>
      {isOpen === title && (
        <div className="p-1 bg-gray-800 text-white">{children}</div>
      )}
    </div>
  );
}

const divStyle = {
  backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.8)), url('logo.png')`,

  height: "100px", // adjust as needed
  width: "100px", // adjust as needed
  // backgroundSize: 'cover',
  // backgroundAttachment: 'fixed',
  marginLeft: "5px",
};
const staticData = [
  {
    id: 1,
    inputText: "Input for Case 1",
    outputText: "Output for Case 1",
  },
  {
    id: 2,
    inputText: "Input for Case 2",
    outputText: "Output for Case 2",
  },
  {
    id: 3,
    inputText: "Input for Case 3",
    outputText: "Output for Case 3",
  },
];
const javaDefault = `
//The compiler class name should be by default Main
// Time: O(log n)
// Java Program to print pattern
// Square hollow pattern


public class Main {
	// Function to demonstrate pattern
	public static void main(int addend1, int addend2)
	{
		return (addend1+addend2);
	}
}

`;
function Home() {
  // const [labs, setLabs] = useState({ testcase: [] });
  // const { labId } = useParams();

  // const [labs, setLabs] = useState([]);

  const [labs, setLabs] = useState({ testcase: [] });
  const [code, setCode] = useState("// Loading code template..."); // Set initial code state to a loading message
  const { labId } = useParams();
  useEffect(() => {
    if (labId) {
      fetchLabDetails(labId);
    }
  }, [labId]);

  const fetchLabDetails = async (labId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/get_lab/${labId}`
      );
      const data = await response.json();

      // Log the full response to verify its structure
      console.log("Full data received from the backend:", data);
      if (data.data && data.data.template) {
        // Assuming the template is directly inside data.data
        setCode(data.data.template); // Update the code state with the fetched template
        setLabs(data.data); // Update the labs state with the fetched data
      } else {
        console.error("data.data or data.data.template is undefined", data);
        setCode("// Error loading template. Please try again."); // Set error message if template is missing
      }
      // Verify that data.data and data.data.testcase exist
      if (data.data && data.data.testcase) {
        let testcaseParsed;
        try {
          // Make sure data.data.testcase is a string before parsing
          if (typeof data.data.testcase === "string") {
            testcaseParsed = JSON.parse(data.data.testcase);
          } else {
            // If it's not a string, it might already be the correct format
            testcaseParsed = data.data.testcase;
          }

          // Log the parsed testcase to verify its structure
          console.log("Parsed testcase:", testcaseParsed);

          // Check if testcaseParsed is an array
          if (Array.isArray(testcaseParsed)) {
            setLabs({ ...data.data, testcase: testcaseParsed });
          } else {
            console.error("Parsed testcase is not an array:", testcaseParsed);
          }
        } catch (parseError) {
          console.error("Error parsing testcase:", parseError);
        }
      } else {
        console.error("data.data or data.data.testcase is undefined", data);
      }
    } catch (error) {
      console.error("Error fetching Labs:", error);
    }
  };

  const notify = (message) => toast(message);
  // console.log(process.env.REACT_APP_RAPID_API_URL);

  //    code from code editor java
  // const [code, setCode] = useState(javascriptDefault);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState(languageOptions[0]);
  const [defaultOutput, setDefaultOutput] = useState(null);
  const [customOutput, setCustomOutput] = useState(null);

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  const onSelectChange = (sl) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
  };

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress);
      console.log("ctrlPress", ctrlPress);
      handleCompile();
    }
  }, [ctrlPress, enterPress]);

  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };
  const handleCompile = async () => {
    setProcessing(true);

    // Check if we have test cases to process
    if (labs && Array.isArray(labs.testcase)) {
      // Iterate over each test case
      for (const test of labs.testcase) {
        try {
          // Extract test case variables and expected output
          const addend1 = test.variables.find(
            (v) => v.name === "addend1"
          ).value;
          const addend2 = test.variables.find(
            (v) => v.name === "addend2"
          ).value;
          const expectedOutput = test.expected_output;

          // Create the Java code for the test case
          const finalCode = `
    public class Main {
        public static void main(String[] args) {
            int addend1 = ${addend1};
            int addend2 = ${addend2};
            int result = addTwoNumbers(addend1, addend2);
            if(result == ${expectedOutput}) {
                System.out.println(result);
            } else {
                System.out.println("Test case ${test.id} failed: Expected " + ${expectedOutput} + ", got " + result);
            }
        }
        
        public static int addTwoNumbers(int a, int b) {
            return a + b;
        }
    }
                    `.trim();

          console.log(
            "Final code to execute for test case " + test.id + ":",
            finalCode
          );

          // Base64 encode the final code
          const encodedFinalCode = btoa(finalCode);

          // Prepare the form data with the encoded source code and standard input
          const formData = {
            language_id: language.id,
            source_code: encodedFinalCode,
            stdin: btoa(test.variables.map((v) => v.value).join("\n")),
          };

          // Set up the request options for the POST request
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

          // Send the request to the compilation API
          const response = await axios.request(options);
          const token = response.data.token;
          console.log("response", response);
          // Now, pass the test case along with the token to the checkStatus function
          await checkStatus(token, test);
        } catch (err) {
          // Handle errors from the POST request
          console.error("Error during compile request:", err);
          setProcessing(false);
        }
      }
    } else {
      console.error("Test cases are not defined or not an array");
      setProcessing(false);
    }
  };

  const checkStatus = async (token, test) => {
    // Ensure the test object is defined
    if (!test) {
      console.error("The test object is undefined.");
      return;
    }

    try {
      // Set up the request options for the GET request
      const options = {
        method: "GET",
        url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
        params: { base64_encoded: "true", fields: "*" },
        headers: {
          "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
          "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
        },
      };

      // Send the request to check the compilation status
      const response = await axios.request(options);
      const statusId = response.data.status?.id;
      const output = atob(response.data.stdout); // Decode the output if it's base64 encoded
      console.log("Standard Output:", atob(response.data.stdout));
      // If the status indicates processing, check again after a delay
      if (statusId === 1 || statusId === 2) {
        setTimeout(() => {
          checkStatus(token, test);
        }, 2000);
        return;
      }

      setProcessing(false);

      // Once processing is complete, compare the output
      if (response.data.stdout) {
        const output = atob(response.data.stdout);
        console.log(`Actual output1: '${output.trim()}'`);
        console.log(
          `Actual output: '${output.trim()}', Expected output: '${test.expected_output.trim()}'`
        );
        if (output.trim() === test.expected_output.trim()) {
          showSuccessToast(`Test case ${test.id} passed!`);
        } else {
          showErrorToast(
            `Test case ${test.id} failed! Expected ${test.expected_output}, got ${output}`
          );
        }
      } else {
        showErrorToast(`Test case ${test.id} did not produce any output!`);
      }
    } catch (err) {
      // Handle errors from the GET request
      console.error("Error during status check:", err);
      setProcessing(false);
    }
  };

  function handleThemeChange(th) {
    const theme = th;
    console.log("theme...", theme);

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

  const [selectedOption1, setSelectedOption1] = useState("Java");
  const [selectedOption2, setSelectedOption2] = useState("Light");
  const [selectedOption3, setSelectedOption3] = useState("10 px");

  const [activeTestCaseId, setActiveTestCaseId] = useState(0);
  const [openAccordion, setOpenAccordion] = useState("Description");

  const accordionContent = {
    Description: <p className="text-black">{labs.description}</p>,
    "I/O Format": <p className="text-black">{labs.io_format}</p>,
    Constraints: <p className="text-black">{labs.constraints}</p>,
    "Sample I/O": <p className="text-black">{labs.io_format}</p>,
    "Pseudo Code": <p className="text-black">{labs.psuedo_code}</p>,
  };
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
            <img src="/logo.png" alt="Logo" height={50} width={50} />
          </Link>
          <div className="flex items-center gap-4 flex-1 justify-center">
            {/* <div
                            className='flex items-center justify-center rounded bg-white-fill-3 hover:bg-white-fill-2 h-8 w-8 cursor-pointer'
                        >
                            <FaChevronLeft />
                        </div> */}
            <Link
              href="/"
              className="flex items-center gap-2 font-medium max-w-[170px] text-dark-gray-8 cursor-pointer"
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

            <Timer />

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

            {/* {user && <Logout />} */}
          </div>
        </div>
      </nav>
      <Split className="split " minSize={0}>
        {/* problem description starts */}

        <div className=" font-bold bg-gray-100">
          {/* TAB */}
          <div className="flex h-11 w-full items-center pt-2 pb-2 bg-gray-100 ">
            {/* <div className="bg-gray-100 rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer">  */}
            {Object.keys(accordionContent).map((title) => (
              <AccordionItem
                key={title}
                title={title}
                isOpen={openAccordion}
                setIsOpen={setOpenAccordion}
              />
            ))}
            {/* </div> */}
          </div>
          {/* <hr></hr> */}

          <div className="relative overflow-hidden flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto bg-white">
            {/* <div className="absolute inset-0 flex justify-center items-center" 
       style={{ 
           backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8))`
       }}>
    <img src="logo.png" alt="Logo" className="w-[300px] h-[300px] bg-cover opacity-500" />
  </div> */}

            <div className="relative z-10 flex-1 px-5 ">
              {/* Problem heading */}
              <div className="w-full">
                <div className="flex space-x-4">
                  <div className="flex-1 mr-2 text-lg text-black font-medium">
                    {labs.name}{" "}
                  </div>
                </div>

                {/* Problem Statement(paragraphs) */}

                {/* Examples */}
                <div className="mt-4">
                  {/* {example.img && <img src={example.img} alt='' className='mt-3' />} */}
                  <div className="example-card">
                    <pre>
                      <strong className="text-black">
                        {" "}
                        {accordionContent[openAccordion]}{" "}
                      </strong>
                      <br />
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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
                options={["Java", "Python", "C"]}
                placeholder="Select Technology"
                selected={selectedOption1}
                handleOptionClick={setSelectedOption1}
              />

              {/* </div> */}
              <ThemeDropdown
                handleThemeChange={handleThemeChange}
                theme={theme}
              />
              <Dropdown
                options={["10 px", "12 px", "13 px"]}
                placeholder="Select Font Size"
                selected={selectedOption3}
                handleOptionClick={setSelectedOption3}
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

                <CodeEditorWindow
                  code={code}
                  onChange={onChange}
                  language={language?.value}
                  theme={theme.value}
                />
              </div>
              <div className="w-full px-5 overflow-auto">
                {/* <div className='flex h-10 items-center space-x-'>
                                    <div className='relative flex h-full flex-col justify-center cursor-pointer'>
                                        <div className='text-sm font-medium leading-5 text-black'>Testcases</div>
                                        <hr className='absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white' />
                                    </div>
                                </div> */}

                <div className="flex flex-col items-end">
                  <div className="font-semibold my-4">
                    <p className="text-sm font-medium mt-4 text-black">
                      Output:
                    </p>
                    <div className="w-full cursor-text rounded-lg border px-3 py-[6px] bg-gray-100  border-transparent text-black mt-3">
                      <OutputWindow
                        defaultOutput={defaultOutput}
                        customOutput={customOutput}
                      />
                    </div>

                    <p className="text-sm font-medium mt-1 text-black">
                      Input:
                    </p>
                    <div className="w-full cursor-text rounded-lg border px-3 py-[6px] bg-gray-100  border-transparent text-black mt-3">
                      {/* {staticData[activeTestCaseId].inputText} */}
                      <CustomInput
                        customInput={customInput}
                        setCustomInput={setCustomInput}
                      />
                    </div>
                  </div>
                </div>
                {outputDetails && (
                  <OutputDetails outputDetails={outputDetails} />
                )}
              </div>

              {/* <div className='w-full px-5 overflow-auto'>
                              
                                <div className='flex h-10 items-center space-x-'>
                                    <div className='relative flex h-full flex-col justify-center cursor-pointer'>
                                        <div className='text-sm font-medium leading-5 text-black'>Testcases</div>
                                        <hr className='absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white' />
                                    </div>
                                </div>

                                <div className='flex'>
                                    {staticData.map((example, index) => (
                                        <div
                                            className='mr-2 items-start mt-1'
                                            key={example.id}
                                            onClick={() => setActiveTestCaseId(index)}
                                        >
                                            <div className='flex flex-wrap items-center gap-y-4'>
                                                <div
                                                    className={`font-medium items-center transition-all focus:outline-none inline-flex bg-gray-100 hover:bg-white-fill-2 relative rounded-md px-4 py-1 cursor-pointer whitespace-nowrap
                                ${activeTestCaseId === index ? "text-black" : "text-gray-500"}
                                `}
                                                >
                                                    Case {index + 1}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className='font-semibold my-4'>
                                    <p className='text-sm font-medium mt-1 text-black'>Input:</p>
                                    <div className='w-full cursor-text rounded-lg border px-3 py-[6px] bg-gray-100  border-transparent text-black mt-3'>
                                        {staticData[activeTestCaseId].inputText}
                                    </div>
                                    <p className='text-sm font-medium mt-4 text-black'>Output:</p>
                                    <div className='w-full cursor-text rounded-lg border px-3 py-[6px] bg-gray-100  border-transparent text-black mt-3'>
                                        {staticData[activeTestCaseId].outputText}
                                    </div>
                                </div>
                            </div> */}
            </Split>
            {/* starting editorfooter */}
            {/* bg-white-layer-1 */}
            <div className="flex b absolute bottom-0 z-10 w-full bg-gray-100 ">
              <div className="mx-5 my-[10px] flex justify-between w-full">
                <div className="mr-2 flex flex-1 flex-nowrap items-center space-x-4">
                  {/* <button className='px-3 py-1.5 font-medium items-center transition-all inline-flex bg-white-fill-3 text-sm hover:bg-white-fill-2 text-dark-label-2 rounded-lg pl-3 pr-2'>
                                        Console
                                        <div className='ml-1 transform transition flex items-center'>
                                            <BsChevronUp className='fill-gray-6 mx-1 fill-dark-gray-6' />
                                        </div>
                                    </button> */}
                </div>
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
                  <div className="flex flex-col items-end">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Split>
    </div>
  );
}

export default Home;
