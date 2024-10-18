import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import axios from "axios";
export default function Bapp() {
  const [Bankname, setBankname] = useState('');
  const [Accountno, setAccountno] = useState('');
  const [IFSCcode, setIFSCcode] = useState('');
  const [Branchname, setBranchname] = useState('');
  const [errors, setErrors] = useState({});

  function display() {
    const validationErrors = validate();
    setErrors(validationErrors);
  }

  const validate = () => {
    const error = {};
    const regularexpression = /^[A-Z]{4}0[A-Z0-9]{6}$/; // Corrected IFSC code regex
    const alphabetRegex = /^[a-zA-Z\s]+$/; // Allows spaces in Bankname/Branchname
    const numberRegex = /^[0-9]+$/; // Allows only numbers for Accountno
    // Bankname validation
    if (Bankname === "") {
      error.Bankname = "Bank name is required";
    } else if (!alphabetRegex.test(Bankname)) {
      error.Bankname = "Bankname should not have numbers or special characters";
    }

    // Accountno validation
    if (Accountno === "") {
      error.Accountno = "Account number is required";
    } else if (Accountno.length < 9) {
      error.Accountno = "Account number should have 9-18 digits";
    } else if (Accountno.length > 18) {
      error.Accountno = "Account number should not be greater than 18 digits";
    } else if (!numberRegex.test(Accountno)) {
      error.Accountno = "Account number should not have any characters";
    }

    // IFSCcode validation
    if (IFSCcode === "") {
      error.IFSCcode = "IFSC code is required";
    } else if (IFSCcode.length !== 11) {
      error.IFSCcode = "IFSC code should be 11 characters long";
    } else if (!regularexpression.test(IFSCcode)) {
      error.IFSCcode = "IFSC code should follow this format: 4 letters, 0, and 6 alphanumeric characters";
    }

    // Branchname validation
    if (Branchname === "") {
      error.Branchname = "Branch name is required";
    } else if (!alphabetRegex.test(Branchname)) {
      error.Branchname = "Branchname should not have any numbers or special characters";
    }

    // Post data only if there are no errors
    if (Object.keys(error).length === 0) {
      axios
        .post("http://localhost:3700/postright", { Bankname, Accountno, IFSCcode, Branchname })
        .then(result => console.log(result))
        .catch(err => console.log(err));
    }

    return error;
  };

  return (
    <div className="registration-container" style={{ backgroundColor: "#e6e9e9", maxWidth: '100%' }}>
      <div className="py-4">
        <div className="row">
          <div className="col-lg-6 d-flex justify-content-center align-items-center mb-4">
            <img 
              src='bankimage.jpg'
              alt="Bank" 
              className="img-fluid" 
              style={{ maxHeight: '400px' }} 
            />
          </div>
          <div className="col-lg-6">
            <div className="p-4 background rounded">
              <form>
                <h2 className="text-center mb-4" style={{ color: "white", backgroundColor: "#0d4523", borderRadius: '10px', padding: '8px' }}>
                  Bank Registration
                </h2>

                <div className="mb-3">
                  <label className="form-label"><strong>Bankname</strong></label>
                  <Form.Control
                    type="text"
                    value={Bankname}
                    onChange={(e) => setBankname(e.target.value)}
                    required
                    name='Bankname'
                  />
                  <div className='text-danger'>{errors.Bankname}</div>
                </div>

                <div className="mb-3">
                  <label className="form-label"><strong>Account no</strong></label>
                  <Form.Control
                    type="text"
                    value={Accountno}
                    onChange={(e) => setAccountno(e.target.value)}
                    required
                    name='Accountno'
                  />
                  <div className='text-danger'>{errors.Accountno}</div>
                </div>

                <div className="mb-3">
                  <label className="form-label"><strong>IFSC code</strong></label>
                  <Form.Control
                    type="text"
                    value={IFSCcode}
                    onChange={(e) => setIFSCcode(e.target.value)}
                    required
                    name='IFSCcode'
                  />
                  <div className='text-danger'>{errors.IFSCcode}</div>
                </div>

                <div className="mb-3">
                  <label className="form-label"><strong>Branchname</strong></label>
                  <Form.Control
                    type="text"
                    value={Branchname}
                    onChange={(e) => setBranchname(e.target.value)}
                    required
                    name='Branchname'
                  />
                  <div className='text-danger'>{errors.Branchname}</div>
                </div>

                <div className="d-grid">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={display}>
                    Save and Next
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
