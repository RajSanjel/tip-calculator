const selectTip = document.querySelectorAll('.select_tip div button')
let hasSelectedTip = false;
let billSet = false;
let percentSet = false;
let peopleSet = true
let tipPercentageValue;
let hasCustomTip = false;

function selectTipPercentage() {
    selectTip.forEach(tipButton => {
        tipButton.addEventListener('click', () => {
            if (hasSelectedTip) {
                document.querySelector('.selected_tip').classList.remove('selected_tip');
                hasSelectedTip = true;
                tipButton.classList.add('selected_tip');
                document.querySelector('.custom_tip').value = ''
            } else {
                tipButton.classList.add('selected_tip');
                document.querySelector('.custom_tip').value = ''
                hasSelectedTip = true;
            }
            let tipPercentageValue = getTipPercent();
            let bill = getBillAmount()
            let numberOfPeople = getNumberOfPeople()
            if (billSet == true &&
                percentSet == true &&
                peopleSet == true) {
                calculateTip(bill, tipPercentageValue, numberOfPeople)
            }
        })
    });
}

function getTipPercent() {
    if (document.querySelector('.selected_tip') !== null) {
        const selectedTipPercentage = document.querySelector('.selected_tip').innerText
        tipPercentageValue = selectedTipPercentage.slice(0, selectedTipPercentage.length - 1)
        percentSet = true;
        return tipPercentageValue;
    }
}

function getBillAmount() {
    const bill = document.querySelector('.bill_tip').value
    billSet = true;
    return bill
}

function getNumberOfPeople() {
    const numberOfPeople = document.querySelector('.select_people').value
    peopleSet = true;
    return numberOfPeople;
}

function calculateTip(billAmount, tipPercent, numberOfPeople) {
    let calcTipPercent = (tipPercent / 100) + 1
    console.log(calcTipPercent)
    const tip = (billAmount * ((tipPercent / 100))) / numberOfPeople;
    const totalTip = (billAmount * (calcTipPercent)) / numberOfPeople;
    if (tip == Infinity) {
        document.querySelector('.amount p').innerText = "$0.00";
        return
    } else {
        if (document.querySelector('.amount p').innerText == `$NaN`) {
            document.querySelector('.amount p').innerText = `$0.00`
        } else {
            document.querySelector('.amount p').innerText = `$${ tip.toFixed(2) }`
            document.querySelector('.per_person p').innerText = `$${ totalTip.toFixed(2) }`
        }
    }
    if (document.querySelector('.amount p').innerText == `$NaN`) {
        document.querySelector('.amount p').innerText = `$0.00`;
        document.querySelector('.per_person p').innerText = `$0.00`
    }
}


document.querySelector('.custom_tip').addEventListener('keyup', () => {
    hasCustomTip = true;
    customTipValue()
})

function customTipValue() {
    const customTip = document.querySelector('.custom_tip')
    const customTipValue = Number(customTip.value)
    const numberOfPeople = getNumberOfPeople()
    document.querySelector('.bill_tip').addEventListener('keydown', () => {
        hasCustomTip = false;
        document.querySelector('.amount p').innerText = "$0.00";
        document.querySelector('.per_person p').innerText = `$0.00`;
        customTip.value = ''
    })
    if (hasCustomTip == true) {
        document.querySelector('.bill_tip').value = ''
        if (hasSelectedTip) {
            document.querySelector('.selected_tip').classList.remove('selected_tip');
            hasSelectedTip = false;
        }
        calculateCustomTip(customTipValue, numberOfPeople)
    }
}

function calculateCustomTip(customTipValue, numberOfPeople) {

    const customTipTotal = customTipValue;
    const customTipPerPerson = Number(customTipValue) / Number(numberOfPeople);
    if (customTipPerPerson == Infinity) {
        document.querySelector('.amount p').innerText = `$0.00`
        return
    } else {
        document.querySelector('.amount p').innerText = `$${ customTipPerPerson.toFixed(2) }`
        document.querySelector('.per_person p').innerText = `$${ customTipTotal.toFixed(2) }`
    }

}

function checkForZero() {
    const selectPeople = document.querySelector('.select_people');
    if (Number(selectPeople.value) <= 0) {
        document.querySelector('.error').classList.remove('hidden')
        selectPeople.id = "error"
    } else {
        document.querySelector('.error').classList.add('hidden')
        selectPeople.removeAttribute("id")
    }
}
document.querySelectorAll('input').forEach(valueChange => {
    valueChange.addEventListener('keyup', () => {
        checkForZero()
        if (hasCustomTip == false) {
            if (Number(document.querySelector('.bill_tip').value) <= 0) {} else {
                let tipPercentageValue = getTipPercent();
                let bill = getBillAmount()
                let numberOfPeople = getNumberOfPeople()
                if (billSet == true &&
                    percentSet == true &&
                    peopleSet == true) {
                    calculateTip(bill, tipPercentageValue, numberOfPeople)
                }
            }
        } else {
            checkForZero()
            customTipValue()
        }
    })

});

document.querySelector('.reset').addEventListener('click', () => {
    document.querySelectorAll("input").forEach(inputs => {
        inputs.value = "";
        document.querySelector('.amount p').innerText = `$0.00`
        document.querySelector('.per_person p').innerText = `$0.00`
        if (hasSelectedTip) {
            document.querySelector('.selected_tip').classList.remove('selected_tip');
            hasSelectedTip = false;
        }
    });
})
selectTipPercentage()