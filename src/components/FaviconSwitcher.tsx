import React from "react";
import { Helmet } from "react-helmet";
import { useTheme } from "../context/ThemeContext";

function FaviconSwitcher() {
  const { isDark } = useTheme();
  const faviconUrl = isDark
    ? "/qstommyshu.github.io/favicon-dark.svg"
    : "/qstommyshu.github.io/favicon-light.svg";

  return (
    <Helmet>
      <link rel="icon" href={faviconUrl} />
    </Helmet>
  );
}

export default FaviconSwitcher;
