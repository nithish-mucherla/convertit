const validate = () => {
  const from = document.getElementById("countryCodesFrom").value;
  const to = document.getElementById("countryCodesTo").value;
  const amount = document.getElementById("fromValue").value;
  if (!from) {
    document.getElementById("countryCodeFromError").classList.remove("hidden");
    return;
  }

  if (!to) {
    document.getElementById("countryCodeToError").classList.remove("hidden");
    return;
  }

  if (!amount) {
    document.getElementById("fromValueError").classList.remove("hidden");
    return;
  }

  if (amount <= 0) {
    let errorDiv = document.getElementById("fromValueError");
    errorDiv.innerHTML = "Please Enter a correct value";
    errorDiv.classList.remove("hidden");
    return;
  }
  convert();
};
const loadCountryCodes = async () => {
  let response = await fetch(
    "https://currency-converter13.p.rapidapi.com/list",
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "USE YOUR API KEY",
        "x-rapidapi-host": "currency-converter13.p.rapidapi.com",
      },
    }
  );
  return response.json();
};

const convert = async () => {
  const from = document.getElementById("countryCodesFrom").value;
  const to = document.getElementById("countryCodesTo").value;
  const amount = document.getElementById("fromValue").value;
  let response = await fetch(
    `https://currency-converter13.p.rapidapi.com/convert?from=${from}&to=${to}&amount=${amount}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "USE YOUR API KEY",
        "x-rapidapi-host": "currency-converter13.p.rapidapi.com",
      },
    }
  );
  response.json().then((data) => {
    document.getElementById("toValue").value = data.amount;
  });
};

const loadData = () => {
  loadCountryCodes().then((data) => {
    optionList = `<option value="" disabled selected>select country code</option>`;
    data.forEach(
      (code) => (optionList += `<option value=${code}>${code}</option>`)
    );
    document.getElementById("countryCodesFrom").innerHTML = optionList;
    document.getElementById("countryCodesTo").innerHTML = optionList;
  });
};
