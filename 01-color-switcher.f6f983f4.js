!function(){var t,e={startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]")};e.stopBtn.setAttribute("disabled",!0),e.startBtn.addEventListener("click",(function(){t=setInterval((function(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}),1e3),e.startBtn.setAttribute("disabled",!0),e.stopBtn.removeAttribute("disabled")})),e.stopBtn.addEventListener("click",(function(){clearInterval(t),e.stopBtn.setAttribute("disabled",!0),e.startBtn.removeAttribute("disabled")}))}();
//# sourceMappingURL=01-color-switcher.f6f983f4.js.map
