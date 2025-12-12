import React from 'react';
import { Link } from 'react-router';

const RegisterHR = () => {
    return (
      <div className="flex justify-center items-center my-6 md:my-30">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-lg shadow-neutral pt-5 mx-auto">
          <h2>Register as HR</h2>
          <p className="text-center">
            or Register as{' '}
            <Link to="/register-employee" className="link text-secondary">
              Employee
            </Link>
          </p>
          <div className="card-body">
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input type="email" className="input" placeholder="Email" />
              <label className="label">Password</label>
              <input type="password" className="input" placeholder="Password" />
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-primary mt-4">Register</button>
              <div>
                <p>
                  Already have an accout ?{' '}
                  <Link to="/login" className="link text-secondary">
                    Login
                  </Link>
                </p>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    );
};

export default RegisterHR;