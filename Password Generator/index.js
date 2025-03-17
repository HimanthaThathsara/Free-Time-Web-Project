function getElement(name){
	return document.querySelector(".password-generator " + name);
}

const passwordInput = getElement("#password");
const passwordLengthValue = getElement("#password-length-value");
const passwordLengthInput = getElement("#password-length-input");
const uppercaseCheckbox = getElement("#uppercase");
const lowercaseCheckbox = getElement("#lowercase");
const numbersCheckbox = getElement("#numbers");
const specialCheckbox = getElement("#special");
const generatePasswordBtn = getElement("#generate-password-btn");
const copyPasswordBtn = getElement("#copy-password-btn");

passwordLengthInput.addEventListener("input", function(e){
	passwordLengthValue.innerText = e.target.value;
});

generatePasswordBtn.addEventListener("click", function(){
	const length = passwordLengthInput.value;
	const lowercase = lowercaseCheckbox.checked;
	const uppercase = uppercaseCheckbox.checked;
	const numbers = numbersCheckbox.checked;
	const special = specialCheckbox.checked;
	
	if(!uppercase && !lowercase && !numbers && !special){
		alert("Select atleast one criteria");
		return;
	}
	
	let specialCharArr = ["_", "@", "%", "$", "&", "%", "@", "_"];
	let password = "";
	
	for(let i=0; i<length; i++){
		let r = Math.random();
		if(r > 0.55 && numbers){
			password += Math.trunc(Math.random()*9);
		} else if(r > 0.4 && uppercase){
			password += String.fromCharCode(
				Math.trunc(Math.random()*26)+65
			);
		} else if(lowercase) {
			password += String.fromCharCode(
				Math.trunc(Math.random()*26)+97
			);
		}
		if(r < Math.random() && special){
			password += specialCharArr[
				Math.trunc(Math.random()*specialCharArr.length)
			];
			i++;
		}
	}
	
	passwordInput.value = password;
});

copyPasswordBtn.addEventListener("click", function(){
	passwordInput.select();
	document.execCommand("copy");
	window.getSelection().removeAllRanges();
});
