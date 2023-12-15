import React from "react";

function Examples({ element }) {
  return (
    <>
      <div class="doc-code">
        <pre>
          <code id="font-link" class="language-markup">
            {element.paragraph}
          </code>
        </pre>
      </div>
      <div class="spacer">&nbsp;</div>
    </>
  );
}

export default Examples;
