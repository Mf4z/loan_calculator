//Listen for submit
document.getElementById('loan-form').addEventListener('submit',function(e){
    //Hide results
    document.getElementById('results').style.display = 'none';

    //Show loader
    document.getElementById('loading').style.display = 'block';

    //Show calc image after 2 secs
    setTimeout(calculateResults,2000);
    e.preventDefault(); 
});

//Calculate Results
function calculateResults(){
    //UI Vars
    const amount_ui = document.getElementById('amount');
    const interest_ui = document.getElementById('interest');
    const years_ui = document.getElementById('years');
    const monthlyPayment_ui = document.getElementById('monthly-payment');
    const totalPayment_ui = document.getElementById('total-payment');
    const totalInterest_ui = document.getElementById('total-interest');

    //Formula
    const principal = parseFloat(amount_ui.value);
    const calculatedInterest = parseFloat(interest_ui.value) /100 /12;
    const calculatedPayments = parseFloat(years_ui.value) * 12;

    //Compute Monthly Payment
    const x = Math.pow(1 + calculatedInterest,calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    if(isFinite(monthly)){
        monthlyPayment_ui.value = monthly.toFixed(2);
        totalPayment_ui.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest_ui.value = ((monthly * calculatedPayments) - principal).toFixed(2);

        //Show results
        document.getElementById('results').style.display = 'block';

        //Hide loader
        document.getElementById('loading').style.display = 'none';
    }
    else{
        //Show error
        showError('Please Check Your Number');
    }
}

function showError(error){

//Hide results
document.getElementById('results').style.display = 'none';

//Hide loader
document.getElementById('loading').style.display = 'none';

    //Create a div
    const errorDiv = document.createElement('div');

    //Get elements 
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    //Add class to error div
    errorDiv.className = 'alert alert-danger';

    //Create text node and  append to div
    errorDiv.appendChild(document.createTextNode(error));

    //Insert error above heading 
    card.insertBefore(errorDiv,heading);

    //Clear error after 3 seconds
    setTimeout(clearError,3000);
    console.log("Check your numbers");
}

 //Clear error
function clearError(){
    document.querySelector('.alert').remove();
}