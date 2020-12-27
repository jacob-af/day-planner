dayjs().format()

$(document).ready( () => {
    let blankDay = ['','','','','','','','','']
    let workDay = blankDay;
    let now = dayjs()
    for (let i = 0; i < workDay.length; i++) {
        let hourToDisplay = 
        $(`
        <div class="row time-block">
            <div class = "col-2 hour" id = "${i+9}">
                ${(i+9)%12} ${i+9<12? 'am' : 'pm'}
            </div>
            <div class ="col-8">
                <textarea class="form-control past" id="timeblock${i}" rows="6">
                    ${workDay[i]}
                </textarea>
            </div>
            <div class = "col-2 saveBtn">
            <i class = "fas fa-save"></i> Save
            </div>
        <div>
        `
        )
        $('.container').append(hourToDisplay)
    }
})



