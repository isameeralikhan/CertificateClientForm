import React, { useState, useEffect } from "react";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserDataForm({ formData, validationErrors, handleInputChange, handleSubmit, handleReset }) {

  const [showValidationAlert, setShowValidationAlert] = useState(false);

  // Watch for changes in validationErrors and show/hide the alert accordingly
  useEffect(() => {
    if (Object.keys(validationErrors).length > 0) {
      setShowValidationAlert(true);
      const timer = setTimeout(() => {
        setShowValidationAlert(false);
      }, 5000); // Hide alert after 5 seconds (adjust as needed)
      return () => clearTimeout(timer);
    } else {
      setShowValidationAlert(false);
    }
  }, [validationErrors]);

  return (
    <form onSubmit={handleSubmit} className="card p-4">
      {/* Validation error banners */}
      {showValidationAlert && (
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
        {Object.values(validationErrors).map((error, index) => (
          <p key={error}>{error}</p>
        ))}
        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setShowValidationAlert(false)}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      )}

      <div className="form-group">
        <label htmlFor="commonName">Common Name (CN)</label>
        <input
          type="text"
          className="form-control"
          id="commonName"
          name="commonName"
          value={formData.commonName}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="organization">Organization (O)</label>
        <input
          type="text"
          className="form-control"
          id="organization"
          name="organization"
          value={formData.organization}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="organizationalUnit">Organizational Unit (OU)</label>
        <input
          type="text"
          className="form-control"
          id="organizationalUnit"
          name="organizationalUnit"
          value={formData.organizationalUnit}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="country">Country (C)</label>
        <CountryDropdown
          className="form-control"
          id="country"
          name="country"
          value={formData.country}
          onChange={(val) => handleInputChange({ target: { name: 'country', value: val } })}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="state">State or Province (ST)</label>
        <RegionDropdown
          className="form-control"
          country={formData.country}
          id="state"
          name="state"
          value={formData.state}
          onChange={(val) => handleInputChange({ target: { name: 'state', value: val } })}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="locality">Locality (L)</label>
        <input
          type="text"
          className="form-control"
          id="locality"
          name="locality"
          value={formData.locality}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="emailAddress">Email Address (emailAddress)</label>
        <input
          type="email"
          className="form-control"
          id="emailAddress"
          name="emailAddress"
          value={formData.emailAddress}
          onChange={handleInputChange}
          required
        />
      </div>

      {/* Radio button group */}
      <div className="form-group">
        <label>Certificate Type</label>
        <div className="radio-group">
          <div>
            <input
              type="radio"
              id="signed"
              name="certificateType"
              value="signed"
              checked={formData.certificateType === "signed"}
              onChange={handleInputChange}
            />
            <label htmlFor="signed" className="ml-2">
              Signed
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="selfSigned"
              name="certificateType"
              value="self-signed"
              checked={formData.certificateType === "self-signed"}
              onChange={handleInputChange}
            />
            <label htmlFor="selfSigned" className="ml-2">
              Self-Signed
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="ca"
              name="certificateType"
              value="CA"
              checked={formData.certificateType === "CA"}
              onChange={handleInputChange}
            />
            <label htmlFor="ca" className="ml-2">
              Certificate Authority
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="unsigned"
              name="certificateType"
              value="unsigned"
              checked={formData.certificateType === "unsigned"}
              onChange={handleInputChange}
            />
            <label htmlFor="unsigned" className="ml-2">
              Unsigned
            </label>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="button-container">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <button
          type="button"
          className="btn btn-secondary ml-2"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </form>
  );
}

export default UserDataForm;
