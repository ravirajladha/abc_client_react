import React from 'react'
import { useNavigate } from "react-router-dom";
export default function BackButton() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <button
      onClick={goBack}
      className="p-2 px-3 d-inline-block text-white fw-700 lh-30 rounded-lg text-center font-xsssss ls-3 bg-current"
    >
      Back
    </button>
  )
}
