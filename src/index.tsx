import React from "react";
import { render } from "react-dom";

const MyPage = () => (
  <div>
    <header>title</header>
    <div>content</div>
  </div>
);

render(
  <MyPage />,
  document.getElementById("root")
);
