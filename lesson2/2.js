/*
* формат входной даты hh-dd-mm-yyyy
* формат таймера ss-mm-hh-dd
*/

const time1 = process.argv[2];

const parseDate = (string) => {
    const dateArray = string.split('-');
    return new Date(`${dateArray[3]}-${dateArray[2]}-${dateArray[1]}T${dateArray[0]}:00Z`);
}

const getDif = (dateFuture) => {
    const diff = dateFuture - (new Date());

    const days  = Math.floor( diff / (1000*60*60*24) );
    const hours = Math.floor( diff / (1000*60*60) );
    const mins  = Math.floor( diff / (1000*60) );
    const secs  = Math.floor( diff / 1000 );

    const d = days;
    const h = hours - days  * 24;
    const m = mins  - hours * 60;
    const s = secs  - mins  * 60;
    return `${s}-${m}-${h}-${d}`;
}

const run = setInterval(() => {
    let timer = getDif(parseDate(time1));
    console.log(timer);
    if (timer === '00-00-00-00') {
        clearInterval(run);
    }
}, 1000);
