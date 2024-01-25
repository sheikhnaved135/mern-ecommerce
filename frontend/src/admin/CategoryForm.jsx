import React, { useState } from "react";

const CategoryForm = ({ name, setName, handleSubmit }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mt-3 mb-3">
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter new category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
