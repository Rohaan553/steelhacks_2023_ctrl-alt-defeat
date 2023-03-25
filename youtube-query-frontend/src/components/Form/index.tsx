import React from 'react' ;
import "./index.css"

const Form = (props) => {
    function sendFormData(){
        let url = document.getElementById("url-element") as HTMLInputElement|null;
        let selectElement = document.getElementById("role-element") as HTMLSelectElement|null;
        let selectedOption = selectElement!.options[selectElement!.selectedIndex].value
        props.passFormData(url!.value, selectedOption)
    }

    return (
        <div id="container">
            <form action="/">
                <div id="url-element-div" className="text-input">
                    <input type="text" placeholder="Enter URL" id="url-element" name="video-url"/>
                </div>
                <div id="submit-element-div">
                    <input type="button" className="submit-button" id="submit-element" value="Analyze" onClick={sendFormData}/>
                </div>
            </form>
        </div>
    )
}

export default Form