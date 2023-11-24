import { useState, useEffect } from 'react';

const useLabDetails = (labId, selectedLevel,setCode) => {
 
    const baseUrl = process.env.REACT_APP_BASE_URL;

  const [labs, setLabs] = useState({});
  const [testCases, setTestCases] = useState([]);
  const [languageId, setLanguageId] = useState([]);
  const [harnessCode, setHarnessCode] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLabDetails = async () => {
      // if (!labId) {
      //   labId = 21;
      // }
      // console.log(`${baseUrl}api/get_lab/${labId}`);

      try {
        const response = await fetch(`${baseUrl}api/get_lab/${labId}`);

          const jsonResponse = await response.json();
  
          // Check if the jsonResponse contains 'data' and 'data' contains 'template'
          if (
            jsonResponse.success &&
            jsonResponse.data &&
            (jsonResponse.data.template1 || jsonResponse.data.template2)
          ) {
            if (selectedLevel === "Level 1" && jsonResponse.data.template1) {
              const formattedTemplate1 = jsonResponse.data.template1.replace(
                /\\n/g,
                "\n"
              );
              setCode(formattedTemplate1);
            } else if (
              selectedLevel === "Level 2" &&
              jsonResponse.data.template2
            ) {
              const formattedTemplate2 = jsonResponse.data.template2.replace(
                /\\n/g,
                "\n"
              );
              setCode(formattedTemplate2);
            }
            //   console.log("Formatted template:", formattedTemplate);
          } else {
            setCode("// Error: Template not found.");
            console.log(
              "Error: Template not found in the response.",
              jsonResponse
            );
          }
  
          //    Verify that data.data and data.data.testcase exist
          if (jsonResponse.data && jsonResponse.data.testcase) {
            let testcaseParsed;
            let  langauge_id ;

            try {
              // Make sure data.data.testcase is a string before parsing
              if (typeof jsonResponse.data.testcase === "string") {
                testcaseParsed = JSON.parse(jsonResponse.data.testcase);
                setLabs(jsonResponse); // Update the labs state with the fetched data
                setTestCases(JSON.parse(jsonResponse.data.testcase));
              } else {
                // If it's not a string, it might already be the correct format
                testcaseParsed = jsonResponse.data.testcase;
              }
              if (typeof jsonResponse.data.language_id === "string") {
                langauge_id = JSON.parse(jsonResponse.data.language_id);
                
                setLanguageId(JSON.parse(jsonResponse.data.language_id));
              } else {
                // If it's not a string, it might already be the correct format
                langauge_id = jsonResponse.data.language_id;
              }
      
              // Check if testcaseParsed is an array
              if (Array.isArray(testcaseParsed)) {
                setLabs({ ...jsonResponse.data, testcase: testcaseParsed });
              } else {
                console.error("Parsed testcase is not an array:", testcaseParsed);
              }
              let dataHarnessCodeParsed;
              if (typeof jsonResponse.data.data_harness_code === "string") {
                // Replace '\n' with actual newline characters
                dataHarnessCodeParsed =
                  jsonResponse.data.data_harness_code.replace(/\\n/g, "\n");
                setHarnessCode(dataHarnessCodeParsed); // Assuming you have a state setter named 'setDataHarnessCode'
              } else {
                dataHarnessCodeParsed = jsonResponse.data.data_harness_code;
                // console.log("Data Harness Code:", dataHarnessCodeParsed);
              }
            } catch (parseError) {
              console.error("Error parsing testcase:", parseError);
            }
          } else {
            console.error(
              "data.data or data.data.testcase is undefined",
              jsonResponse
            );
          }

      } catch (error) {
        console.error("Error fetching lab details:", error);
        setCode("// Error: Could not fetch lab details.");
        setError(error);
      }
    };

    fetchLabDetails();
  }, [labId, selectedLevel,setCode]);
// console.log(languageId)
  return {  labs, testCases, harnessCode,languageId, error };
};

export default useLabDetails;
