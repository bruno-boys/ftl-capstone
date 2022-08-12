import React from 'react';
import { useState, useEffect} from "react";
import apiClient from "../../services/apiClient";
import 'react-calendar/dist/Calendar.css';
import Header from '../../partials/Header';
import DashHabits from '../DashHabits/DashHabits';
import HabitForm from '../HabitForm/HabitForm';
import Modal from '../../utils/Modal'
import './Dashboard.css'
import { LitElement, html } from 'lit-element'
import '@material/mwc-icon/mwc-icon.js'
import { DateTime } from 'luxon'
import ToggleButton from './ToggleButton/ToggleButton';


function Dashboard() {


// useEffect(() => {

//   function showNotifications() {

//     const notification = new Notification("New Message from HabitTraker", {
//       body: "Welcome to HabitTraker! Let's make your first habit!",
//       icon: "src/images/ht-icon.png"
//     });

//     notification.onclick = (e) => {
//       window.location.href = "http://localhost:5173/habits";
//     }
//   }

//   // defualt, granted, denied
//   console.log(Notification.permission);

//   if (Notification.permission == 'granted') {
//     showNotifications();
//   } 
//   else if (Notification.permission != 'denied') {
//     Notification.requestPermission().then(permission => {
//       if (permission === 'granted') { showNotifications(); }
//     })
//   }
  
// }, [])



  const [habits, setHabits] = useState([]);
  const [filteredHabits, setFilteredHabits] = useState([])
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [errors, setErrors] = useState();
  const [form, setForm] = useState({
    habitName: "",
    startDate: "",
    endDate: "",
    frequency: "",
    period: "Per Day",
  });
  const formatDate = (date) => {

    var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + (d.getDate()),
        year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
    }
  const [datePicked, setDatePicked] = useState(formatDate(new Date()))
  const [buddy, setBuddy] = useState()

  async function askNotificationPermission() {
    return new Promise(function (resolve, reject) {
      const permissionResult = Notification.requestPermission(function (result) {
        resolve(result);
      });

      if (permissionResult) {
        permissionResult.then(resolve, reject);
      }
    }).then(function (permissionResult) {
      if (permissionResult !== 'granted') {
        throw new Error("We weren't granted permission.");
      }
    });
  }

  function setDate() {
    setDatePicked(localStorage.getItem('datePicked'))
  }

  


  useEffect(() => {

      const getHabits = async () => {
        const { data, error } = await apiClient.fetchHabitList();
        if (error) {
          setErrors(error);
        }
        if (data?.habits) {
          setHabits(data.habits);
        }
      };

      const getBuddyData = async () => {
        const { data, error } = await apiClient.fetchBuddyData();
        if (error) {setErrors(error)}
        if (data) {setBuddy(data)}
      }

      getHabits();
      getBuddyData();
      askNotificationPermission();

    }, []);

  const closeModal = () => {
    setVideoModalOpen(false); 
    setForm({
      habitName: "",
      startDate: "",
      frequency: "",
      period: "Per Day",
    });
    window.location.reload();
  }

  useEffect(()=> {

    const filterHabits = (date) => {
      
      setFilteredHabits(
        habits.filter(
          (habit) =>(new Date(formatDate(habit.start_date))).getTime() <= (new Date(datePicked)).getTime() && (new Date(habit.end_date).getTime() >  (new Date(datePicked)).getTime())
        )
      );
    }

    filterHabits()

  },  [datePicked, habits])


  useEffect(() => {
    console.log("date picked", datePicked)
    console.log("start date get time", habits[0]?.start_date)
  }, [datePicked])



    useEffect(() => {
      console.log('buddy = ',buddy)
    }, [buddy])

  return (
      <div className="flex flex-col min-h-screen overflow-hidden">

          {/*  Site header */}
          <Header />

          {/*  Page content */}
          <main className="flex-grow">
              <section className="bg-gradient-to-b from-gray-100 to-white">
                  <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                     
                      <>
                      <ToggleButton buddy={buddy}/>
                      {/* <DateCarousel /> */}
                      <div className="date-slider">
                        <date-carousel on-week-change="onWeekChange($event)" on-day-pick="onDayPick($event)" onClick={setDate}></date-carousel>
                      </div>

                      {/* Page Content */}
                        <div className="activity-page">

                            <div className='left'>
                              <div className="daily-habits-container">
                                <div className="daily-habits">
                                  <div className="create-habit-btn">
                                      { localStorage.getItem("toggleOn") == "false" ?
                                        <div className="btn-sm text-white bg-blue-600 hover:bg-blue-700 ml-3" style={{marginLeft:"0px", marginBottom:"0.25rem"}}>
                                          <span onClick={(e) => { e.preventDefault(); e.stopPropagation(); setVideoModalOpen(true); }} aria-controls="modal">Create Habit</span>
                                        </div>
                                        :
                                        <></>
                                      }
                                  </div>
                                  <div className="activity-habits">
                                    <DashHabits habits={filteredHabits} formModalOpen={formModalOpen} setFormModalOpen={setFormModalOpen} handleClose={closeModal} buddy={buddy} />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className='right'>
                              <div className="daily-habits-container">
                                  <div className="dashboard-stats">
                                    Right
                                  </div>
                              </div>
                            </div>

                            {/* Modal */}
                            <Modal id="create-habit-modal" ariaLabel="modal-headline" show={videoModalOpen} handleClose={closeModal}>
                              <div className="relative pb-9/16">
                                <div className="create-habit">
                                  <HabitForm form={form} setForm={setForm} handleClose={closeModal}/>
                                </div>
                              </div>
                            </Modal>
                        </div>
                      </>

                    </div>
                  </div>
              </section>


          </main>

      </div>
  )
}

export default Dashboard;


export const FORMAT_YEAR_WEEK = 'yyyy-c'
export const FORMAT_YEAR_MONTH_DAY = 'yyyy-LL-dd'

/**
 * `date-carousel`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class DateCarousel extends LitElement {

  // We have to list _days as a property otherwise change detection in the lit template doesn't work. 
  static get properties() {
    return { 
      _days: { type: Array },
      useEthiopianCalendar: { type: Boolean }
    };
  }

  constructor() {
    super()
  }

  connectedCallback() {
    super.connectedCallback()

    var now = DateTime.local()
    if (this.useEthiopianCalendar) {
      now = now.reconfigure({ outputCalendar: 'ethiopic' })
    }

    this.weekInView = now.startOf("week")
    this.weekUnixValue = now.startOf("week").toFormat('X') // unix timestamp in seconds
    this.datePicked = now.toFormat(FORMAT_YEAR_MONTH_DAY)
    this.dateUnixValue = now.toFormat('X') // unix timestamp in seconds
    this._calculateDays()
  }

  _calculateHeaderText() {
    let firstDayOfWeek = this.weekInView
    let lastDayOfWeek = this.weekInView.plus({days: 6})

    const firstDayOfWeekYear = parseInt(firstDayOfWeek.toFormat('yyyy'))
    const lastDayOfWeekYear = parseInt(lastDayOfWeek.toFormat('yyyy'))

    let headerText
    if (firstDayOfWeekYear !== lastDayOfWeekYear) {
      // the week stradles a new year --- show year text in both strings
      headerText = `${firstDayOfWeek.toFormat('dd LLL yyyy')} - ${lastDayOfWeek.toFormat('dd LLL yyyy')}`
    } else {
      // the week is in the same year --- only show the year at the end
      headerText = `${firstDayOfWeek.toFormat('dd LLL')} - ${lastDayOfWeek.toFormat('dd LLL yyyy')}`
    }
    return headerText
  }

  _calculateDays() {
    let days = []
    let currentDayCount = 1
    let currentDay = this.weekInView

    this._headerText = this._calculateHeaderText()

    while (currentDayCount <= 7) {
      days.push({
        dayOfWeek: currentDay.toFormat('ccc'),
        dayOfMonth: currentDay.toFormat('d'),
        day: currentDay.toFormat('dd'),
        month: currentDay.toFormat('LL'),
        year: currentDay.toFormat('yyyy'),
        unix: currentDay.toFormat('X'),
        class: (this.datePicked === currentDay.toFormat(FORMAT_YEAR_MONTH_DAY)) ? 'selected' : ''
      })
      currentDay = currentDay.plus({days: 1})
      currentDayCount++
    }
    this._days = days
  }

  _next() {
    this.weekInView = this.weekInView.plus({weeks: 1})
    this.weekUnixValue = this.weekInView.toFormat('X')
    this.datePicked = this.weekInView.toFormat(FORMAT_YEAR_MONTH_DAY)
    this.dateUnixValue = this.weekInView.toFormat('X')
    this._calculateDays()
    this.dispatchEvent(new CustomEvent('on-week-change'))
  }

  _back() {
    this.weekInView = this.weekInView.minus({weeks: 1})
    this.weekUnixValue = this.weekInView.toFormat('X')
    this.datePicked = this.weekInView.toFormat(FORMAT_YEAR_MONTH_DAY)
    this.dateUnixValue = this.weekInView.toFormat('X')
    this._calculateDays()
    this.dispatchEvent(new CustomEvent('on-week-change'))
  }

  _onDayPick(event) {
    const day = event.currentTarget.dataset.day
    const month = event.currentTarget.dataset.month
    const year = event.currentTarget.dataset.year
    this.datePicked = `${year}-${month}-${day}`
    this.dateUnixValue = event.currentTarget.dataset.unix
    this._calculateDays()
    this.dispatchEvent(new CustomEvent('on-day-pick'))
    localStorage.setItem('datePicked', this.datePicked)
  }

  _today() {
    var now = DateTime.local()
    if (this.useEthiopianCalendar) {
      now = now.reconfigure({ outputCalendar: 'ethiopic' })
    }

    this.weekInView = now.startOf("week")
    this.datePicked = now.toFormat(FORMAT_YEAR_MONTH_DAY)
    this.weekUnixValue = now.startOf("week").toFormat('X')
    this.dateUnixValue = now.toFormat('X')
    this._calculateDays()
    this.dispatchEvent(new CustomEvent('on-day-pick'))
    localStorage.setItem('datePicked', this.datePicked)
  }

  render() {
    return html`
      <style>
        :host {
          display: block;
        }
        table {
          width: var(--date-carousel-table-width, 100%);
          font-size: var(--date-carousel-table-font-size, 1em);
          color: var(--date-carousel-table-color, #000);
        }
        #dc-title {
          display: flex;
          justify-content: center;
        }
        mwc-icon {
          font-size: var(--date-carousel-button-font-size, --date-carousel-table-font-size, 1em);
        }
        .month {
          font-size: var(--date-carousel-month-font-size, 1em);
          color: var(--date-carousel-month-color, #000);
        }
        .day-of-week {
          text-align: center;
        }
        .day-of-month {
          text-align: center;
        }
        .selected .day-of-month {
          background: var(--date-carousel-selected-background, #CCC);
          color: var(--date-carousel-selected-color, #000);
          border-radius: 15px;
        }
        td.button {
            white-space:nowrap;
            width: 1px;
        }
        .clickable {
          cursor: pointer;
        }
      </style>
      <table class="header">
        <tr>
          <td id="dc-title">
            <div class="month">${this._headerText}</div>
          </td>
          <td class="clickable button" @click="${this._today}">
            <button class="today">Today</button>
          </td>
        </tr>
      </table>
      <table class="days">
        <tr>
          <td class="clickable button" @click="${this._back}">
            <mwc-icon class="back">chevron_left</mwc-icon>
          </td>
          ${this._days.map(day => html`
            <td @click="${this._onDayPick}" data-day="${day.day}" data-month="${day.month}" data-year="${day.year}" data-unix="${day.unix}" class="clickable day ${day.class}">
              <div class="day-of-week">
                ${day.dayOfWeek}
              </div>
              <div class="day-of-month">
                ${day.dayOfMonth}
              </div>
            </td>
          `)}
          <td class="clickable button" @click="${this._next}">
            <mwc-icon class="forward">chevron_right</mwc-icon>
          </td>
        </tr>
      </table>
    `;
  }

}

window.customElements.define('date-carousel', DateCarousel);

