import moment from 'moment';

export const daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"]

export function weekDateArray(startDate){
    let week = []
    for(let i=0; i<7; i++){
        week.push(startDate.format("ddd DD"))
        startDate = startDate.clone().add(1, 'days')
    }
    return week
}

export function weekUtil(year, month, weekNumber){
    let startDate = moment([year, month]),
        offsetStartDate = moment([year, month]).add(weekNumber - 1, 'week'),
        firstOfMonth = moment(startDate).clone().startOf('month'),
        firstOfMonthDate = firstOfMonth.date(),
        firstOfMonthDay = firstOfMonth.day(),
        lastOfMonth = moment(startDate).clone().endOf('month'),
        lastOfMonthDate = lastOfMonth.date(),
        daysInMonth = moment([year, month]).daysInMonth(),
        weeksInMonth = Math.ceil((firstOfMonthDay + daysInMonth)/7),
        currentWeek = moment(offsetStartDate).clone().day(firstOfMonthDay),
        currentDay = parseInt(moment(offsetStartDate).subtract((firstOfMonthDay), 'day').clone().format('D')),
        week = [],
        daysToAdd = 0

    //if first week in month, set currentDay to 1 and add blank days to beginning of week as needed
    if(weekNumber === 1){
        currentDay = parseInt(moment(startDate).clone().format('D'))
        for(var i = 0; i < firstOfMonthDay; i++){
            let blank = '';     
            week.push(blank);
        }
    }

    //determine how many days to add after any necessary blanks have been added
    if(weekNumber === 1){//if first week of month 
        daysToAdd = 8 - week.length;
    } else if (weekNumber === weeksInMonth){//if last week of month
        daysToAdd = currentDay + (lastOfMonthDate - currentDay)+1;
    } else {
        daysToAdd = currentDay + 7;
    }

    //add remaining days after blanks
    for(var i = currentDay; i < daysToAdd; i++){
        week.push(i); 
    }

    return week;
}

export function monthUtil(year, month){
    let startDate = moment([year, month]),
        firstOfMonth = moment(startDate).clone().startOf('month'),
        firstOfMonthDate = firstOfMonth.date(),
        firstOfMonthDay = firstOfMonth.day(),
        daysInMonth = moment([year, month]).daysInMonth(),
        weeksInMonth = Math.ceil((firstOfMonthDay + daysInMonth)/7),
        weeks = [],
        weekNumber = 1
        
    while(weekNumber <= weeksInMonth){
        weeks.push([weekUtil(year, month, weekNumber)]);
        weekNumber++;
    }

    return weeks;

}

export function padDate(string){
    return string.padStart(2, '0');
}