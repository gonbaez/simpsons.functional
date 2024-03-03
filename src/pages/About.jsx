import React from "react";

const About = () => {
  return (
    <div
      style={{ fontFamily: "Simpsons", textAlign: "center", fontSize: "2rem" }}
    >
      <p>
        This Simpsons quote page was written in React using function components.
      </p>
      <p>
        It was written by{" "}
        <a
          href="https://www.linkedin.com/in/gonzalo-baez/"
          target="_blank"
          rel="noreferrer"
        >
          Gonzalo Baez
        </a>{" "}
        as part of the Software Engineer Bootcamp course by{" "}
        <a href="https://www.thejump.tech/" target="_blank" rel="noreferrer">
          The Jump Digital School
        </a>
        .
      </p>
    </div>
  );
};

export default About;
