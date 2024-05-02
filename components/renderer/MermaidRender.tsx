"use client";
import React, { useEffect, useState } from "react";
import mermaid from "mermaid";
import { useTheme } from "next-themes";

const MermaidRender = ({
    codeStr,
    isWide,
    id,
}: {
    codeStr: string;
    isWide: boolean;
    id: string;
}) => {
    const { resolvedTheme } = useTheme();
    const [html, setHtml] = useState("");

    mermaid.initialize({
        // startOnLoad: true,
        theme: "default",
        securityLevel: "loose",
        gantt: {
            useMaxWidth: false,
            // displayMode: "",
            barHeight: 20,
            useWidth: 800,
            // useHeight: 400,
        },
        themeCSS: `
    g.classGroup rect {
      fill: #282a36;
      stroke: #6272a4;
    } 
    g.classGroup text {
      fill: #f8f8f2;
    }
    g.classGroup line {
      stroke: #f8f8f2;
      stroke-width: 0.5;
    }
    .classLabel .box {
      stroke: #21222c;
      stroke-width: 3;
      fill: #21222c;
      opacity: 1;
    }
    .classLabel .label {
      fill: #f1fa8c;
    }
    .relation {
      stroke: #ff79c6;
      stroke-width: 1;
    }
    #compositionStart, #compositionEnd {
      fill: #bd93f9;
      stroke: #bd93f9;
      stroke-width: 1;
    }
    #aggregationEnd, #aggregationStart {
      fill: #21222c;
      stroke: #50fa7b;
      stroke-width: 1;
    }
    #dependencyStart, #dependencyEnd {
      fill: #00bcd4;
      stroke: #00bcd4;
      stroke-width: 1;
    } 
    #extensionStart, #extensionEnd {
      fill: #f8f8f2;
      stroke: #f8f8f2;
      stroke-width: 1;
    }`,
        fontFamily: "Fira Code",
    });
    useEffect(() => {
        (async () => {
            const chartCode =
                (resolvedTheme === "dark"
                    ? `%%{init: {'theme':'dark'}}%%\n`
                    : `%%{init: {'theme':'default'}}%%\n `) + codeStr;

            const { svg } = await mermaid.render("mermaid-" + id, chartCode);
            setHtml(svg);
        })();
    }, [resolvedTheme, codeStr, id]);

    return (
        <>
            <div className="not-prose overflow-x-auto">
                <div
                    className={`flex justify-center items-center mx-auto ${
                        isWide ? "w-[800px] sm:w-full" : "w-full"
                    }`}
                    dangerouslySetInnerHTML={{ __html: html }}></div>
            </div>
        </>
    );
};

export default MermaidRender;
