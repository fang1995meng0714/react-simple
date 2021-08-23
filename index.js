import React from "./react";
import ReactDOM from "./react-dom";

// const ele = (
//     <div className="active" title="123">
//         hello, <span>react</span>
//     </div>
// )

function Home() {
    return (
        <div className="active" title="123">
            hello, <span>react</span>
        </div>
    )
}
const title = "active";
ReactDOM.render(<Home name={title}/>, document.querySelector("#root"));