import React from "react";
import { Helmet } from "react-helmet";
import { useTheme } from "../context/ThemeContext";

function FaviconSwitcher() {
  const { isDark } = useTheme();
  const faviconUrl = isDark ? "/favicon-dark.svg" : "/favicon-light.svg";

  return (
    <Helmet>
      <link rel="icon" href={faviconUrl} />
    </Helmet>
  );
}

export default FaviconSwitcher;
