import './Activity.css'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function Activity(){

    function getPrint(event) {
        console.log("day = ",event)
    }

    return (
        <>
         <h1 className='title'>Activity Page</h1>
         <div className="activity-page">
            <div className='left'>
                <Calendar onClickDay={getPrint}/>
                <div className="daily-habits">
                    habits for today
                </div>
            </div>
            <div className='right'>
                <div className="statistics">
                    stats
                </div>
            </div>
        </div>
        </>
    )
}