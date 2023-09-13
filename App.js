import React, { useState } from "react";
import "./App.css";
import UserDataForm from "./MyComponents/UserDataForm";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [formData, setFormData] = useState({
    commonName: "",
    organization: "",
    organizationalUnit: "",
    country: "",
    state: "",
    locality: "",
    emailAddress: "",
    certificateType: "signed",
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form data before submission
    const errors = validateFormData(formData);
    if (Object.keys(errors).length === 0) {
      // No validation errors, proceed with submission
      let apiUrl = "http://localhost:8080/create/certificate";

    switch (formData.certificateType) {
      case "signed":
        apiUrl += "/signed";
        break;
      case "self-signed":
        apiUrl += "/self-signed";
        break;
      case "CA":
        apiUrl += "/Ca";
        break;
      case "unsigned":
        apiUrl += "/Unsigned";
        break;
      default:
        break;
    }
    const { certificateType, ...formDataWithoutCertificateType } = formData;
    sendPostRequest(formDataWithoutCertificateType,apiUrl);
    setValidationErrors({});
    } else {
      // Validation errors found, display them
      setValidationErrors(errors);
    }
  };

  function sendPostRequest(data,apiUrl) {
    const jsonData = JSON.stringify(data);
    // Define the URL of your REST endpoint
    console.log("JSON data:", jsonData);
    console.log("apiurl:", apiUrl);
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    })
      .then((response) => {
        if (response.status === 201) {
          // Request was successful, handle the response if needed
          // Convert the response body to text and log it
          return response.text().then((responseText) => {
            console.log("Response Body (String):", responseText);
          });
        } else {
          // Handle error responses here
          console.error("Error:", response.status);
          throw new Error("Request failed");
        }
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetch
        console.error("Fetch Error:", error);
      });
  }

  const handleReset = () => {
    // Reset form data and validation errors
    setFormData({
      commonName: "",
      organization: "",
      organizationalUnit: "",
      country: "",
      state: "",
      locality: "",
      emailAddress: "",
      certificateType: "signed",
    });
    setValidationErrors({});
  };

  // Validation function
  const validateFormData = (data) => {
    const errors = {};

    // Common Name (CN) validation: Alphabets only
    if (!/^[A-Za-z\s]+$/.test(data.commonName)) {
      errors.commonName = "Common Name should contain alphabets only";
    }

    // Organization, Organizational Unit, and Locality validation: Alphanumeric and spaces
    const textRegex = /^[A-Za-z0-9\s]+$/;
    if (!textRegex.test(data.organization)) {
      errors.organization = "Organization should contain alphanumeric characters and spaces only";
    }
    if (!textRegex.test(data.organizationalUnit)) {
      errors.organizationalUnit = "Organizational Unit should contain alphanumeric characters and spaces only";
    }
    if (!textRegex.test(data.locality)) {
      errors.locality = "Locality should contain alphanumeric characters and spaces only";
    }

    // Email Address validation
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(data.emailAddress)) {
      errors.emailAddress = "Invalid email address";
    }

    return errors;
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">User Data Form</h2>
      <UserDataForm
        formData={formData}
        validationErrors={validationErrors} // Pass validation errors to the form component
        handleInputChange={(e) =>
          setFormData({ ...formData, [e.target.name]: e.target.value })
        }
        handleSubmit={handleSubmit}
        handleReset={handleReset}
      />
    </div>
  );
}

export default App;