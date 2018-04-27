import moment from 'moment';

export function weekUtil(currentDay, firstOfMonthDay, lastOfMonthDate, weeksInMonth, weeksLength){
    let week = [],
        daysToAdd = 0

    //add blank days to first week
    if(currentDay === 1){
        for(var i = 0; i < firstOfMonthDay; i++){
            let blank = '';     
            week.push(blank);
        }
    }
    //determine how many days to add after any necessary blanks have been added
    if(currentDay === 1){//if first week of month 
        daysToAdd = 8 - week.length;
    } else if (weeksLength >= weeksInMonth){//if last week of month
        daysToAdd = currentDay + (lastOfMonthDate - currentDay) + 1;
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
        lastOfMonth = moment(startDate).clone().endOf('month'),
        lastOfMonthDate = lastOfMonth.date(),
        lastOfMonthDay = lastOfMonth.day(),
        daysInMonth = moment([year, month]).daysInMonth(),
        weeksInMonth = Math.floor((firstOfMonthDay + daysInMonth)/7),
        weeks = [],
        weeksLength = 0,
        currentWeek = firstOfMonth.clone().day(firstOfMonthDay),
        currentDay = parseInt(currentWeek.format('D'))
        
    weeks.push([weekUtil(currentDay, firstOfMonthDay, lastOfMonthDate, weeksInMonth, weeksLength)])
    console.log('weeks before while: ' + weeks)
    while(currentWeek < lastOfMonth){
        //determine how to increment currentDay and currentWeek
        if(currentDay === 1){
            currentDay = currentDay + (7- firstOfMonthDay);
            currentWeek.add(7, 'day');
        } else if ((weeks.length + 1) >= weeksInMonth){ //if last week of month
            currentDay = currentDay + 7;
            if(lastOfMonthDay === 6){ //if month ends on Saturday
                currentWeek.add( 6 , 'day');
            } else if (lastOfMonthDay === 0){ //if month ends on Sunday
                currentWeek.add( 1 , 'day');
            } else if (lastOfMonthDay === 1){ //if month ends on Monday
                currentWeek.add( 2 , 'day');
            } else {
                currentWeek.add((6 - lastOfMonthDay), 'day');
            }
        } else {
            currentDay = currentDay + 7;
            currentWeek.add(7, 'day');
        }
        weeksLength++;
        weeks.push([weekUtil(currentDay, firstOfMonthDay, lastOfMonthDate, weeksInMonth, weeksLength)]);
    }
    return weeks;
}

