async function fetchReportConditions() {
    const response = await fetch('/report/conditions');
    return response.json();
}

function openReportWindow() {
    const reportWindow = window.open(
        '/report/conditions/view',
        'ReporteCondiciones',
        'width=800,height=600,top=100,left=100,toolbar=no,menubar=no,location=no,status=no'
    );

    if (!reportWindow) {
        showPopup('Por favor, permite las ventanas emergentes en tu navegador.');
    }
}
