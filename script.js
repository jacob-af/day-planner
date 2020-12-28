$(document).ready( () => {
    dayjs().format()
    let blankDay = ['','','','','','','','','']
    let workDay = blankDay;
    let now = dayjs()

    $('#currentDay').text(now.format('dddd, MMMM D, YYYY h:mm A'))

    if (!localStorage.getItem('workDay')) {
        workDay = blankDay
    } else {
        workDay = JSON.parse(localStorage.getItem('workDay'))
    }

    for (let i = 0; i < workDay.length; i++) {
        let relativeTime = 'future'
        let offsetI = i+9
        if (offsetI < now.hour()) {
            relativeTime = 'past'
        } else if (offsetI === now.hour()) {
            relativeTime = 'present'
        }
        let hourToDisplay = 
        $(`
        <div class="row">
            <div class = "col-2 hour" id = "hour${i}">
                ${offsetI <= 12 ? offsetI : offsetI % 12} ${offsetI < 12 ? 'am' : 'pm'}
            </div>
            
            <textarea class="col-8 ${relativeTime} note${i}" >${workDay[i]}</textarea>
   
            <div class = "col-2 saveBtn" save=${i}>
                <i class = "fas fa-save"></i> Save
            </div>
        <div>
        `);
        $('.container').append(hourToDisplay)
    }

    $('.saveBtn').on('click', function() {
        let indexOfClick = $(this).attr('save')
        workDay[indexOfClick] = $(`.note${indexOfClick}`).val()
        localStorage.setItem('workDay', JSON.stringify(workDay))
    })
})



