import React from "react";
import lang from "../utils/languageConstants";
import { useSelector } from "react-redux";

const GPTSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);

  return (
    langKey && (
      <div className="pt-[15%] ml-[30rem] w-full">
        <form
          className="w-full bg-black grid grid-cols-12"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            className="p-4 m-4 col-span-9 font-bold"
            placeholder={lang[langKey].gptSearchPlaceholder}
          />
          <button className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg font-bold">
            {lang[langKey].search}
          </button>
        </form>
      </div>
    )
  );
};

export default GPTSearchBar;
