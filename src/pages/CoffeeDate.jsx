import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import '../styles/CoffeeDate.css'
import axios from 'axios';

// Import your local images
// import herPhoto from '../assets/her_photo.jpeg';
import myPhoto from '../assets/me.jpeg';
import coffeeCupImg from '../assets/coffee_cup.jpeg'; 
import heartCoffeeImg from '../assets/heart_coffee.jpeg';

export default function CoffeeDateInvite() {
    const [response, setResponse] = useState(null);
    const [favoriteCafe, setFavoriteCafe] = useState('');
    const [timing, setTiming] = useState('');
    const [optionalNote, setOptionalNote] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showGhibli, setShowGhibli] = useState(false);

    // New state clearly to control customized appreciation message:
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    let logged_in = localStorage.getItem('logged_in')
    let her_name = localStorage.getItem('her_name')
    let herPhotoPath = `src/assets/${her_name}_photo.jpeg`;

    document.documentElement.style.setProperty('--her-name', `"${her_name}"`);

    // console.log(her_name)
    if (logged_in && logged_in == her_name){
      logged_in = true
    }
    else{
      // console.log('Else')
      navigate("/")
    }

    //TOOD: Update by photo via name of the logged in User and the background design name as well.

    const handleSubmit = async () => {
        if (!favoriteCafe.trim()) {
        alert("Please enter your favorite café!");
        return;
        }

        // console.log('Favorite Cafe:', favoriteCafe);
        // console.log('Timings: ', timing)
        // console.log('Note:', optionalNote);

        const API_ENDPOINT = "https://devapi.acrodocz.com/accepted-coffee";
        try {
            const response = await axios.post(API_ENDPOINT, {
              cafe: favoriteCafe,
              timing: timing,        // optional, include if backend accepts it
              note: optionalNote      // optional, include if backend accepts it
            });
        
            console.log('API Response:', response.data);
            // alert("Thanks for accepting coffee invite!");

             // Update state clearly with personalized appreciation message ✅
            setSuccessMessage(`You're amazing ${her_name}! "${favoriteCafe}" sounds lovely. Looking forward to our coffee chat! ☕❤️`);

            // Auto-Close modal after 3 seconds clearly ✅
            setTimeout(() => {
                setShowModal(false);    // close the modal
                setSuccessMessage('');  // clear success message 
            }, 5000);
            
            if (her_name == 'Tanisha' | her_name=='Gnan'){
              setShowGhibli(true);
            }
        
        } catch (error) {
            console.error('Axios error:', error);
            alert('🐛 Something went wrong, please check console.');
        }
    };
  
    return (
      <>
      {logged_in ?(
      <div className="coffee-date-container">
        {/* Pure CSS background decorations */}
        <div className="background-decorations">
          <div className="coffee-ring ring-top-left"></div>
          <div className="coffee-ring ring-bottom-right"></div>
          <div className="coffee-ring ring-center"></div>
          <div className="coffee-dots dots-group-1"></div>
          <div className="coffee-dots dots-group-2"></div>
          <div className="coffee-dots dots-group-3"></div>
        </div>
        
        <div className="coffee-card">
          <div className="card-header">
            <h1 className="card-title">
              {showGhibli ?
                <>Its a date then!</>
                :
                <>How About a Coffee?</>
              }
            </h1>
            <div className="coffee-steam">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <div className="photo-grid photo-grid-top">
            <div className="photo-container">
              <img src={myPhoto} alt="Me" className="grid-photo" />
              <div className="note-overlay">What does Pushkar want?</div>
            </div>
            <div className="photo-container">
              <img src={coffeeCupImg} alt="Coffee cup with hearts" className="grid-photo" />
              <div className="note-overlay">I think Pushkar wants to drink a coffee with {her_name}!</div>
            </div>
          </div>

          <p className="invitation-text">
            {showGhibli ?
              <>Okay, confession time 😅 I tried to play it cool by being distant, thinking maybe you'd fade from my mind. Spoiler alert: that totally didn’t work. You've been stuck in my head this whole time, and honestly, I kept hoping you'd text or call or just randomly show up in my notifications.</>
              :
              <>I know a great place that we could go. Let's have coffee together soon!</>
            }
          </p>
  
          <div className="photo-grid photo-grid-bottom">
            <div className="photo-container">
              <img src={heartCoffeeImg} alt="Coffee with heart" className="grid-photo" />
              <div className="note-overlay">I think Pushkar wants to go on Coffee date with {her_name}, but will she go on a date with Pushkar?!</div>
            </div>
            <div className="photo-container">
              <img src={herPhotoPath} alt="Her" className="grid-photo" />
              <div className="note-overlay">{her_name} here and I will decide whether to go or not with this Banarasi guy...</div>
            </div>
          </div>
  
          <div className="response-section">
            {!showGhibli ? (
                <button
                className="response-button"
                onClick={() => setShowModal(true)}
                >
                Sure!
                </button>
            ) : (
                <motion.div
                className="success-message"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                >
                Awesome! Looking forward to it ☕🥰
                </motion.div>
            )}

            <AnimatePresence>
                {showModal && (
                <motion.div
                    className="modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                    className="modal-content"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    >
                    {/* Conditional display of form or appreciation message clearly ✅ */}
                    {!successMessage ? (
                        <>
                        <h2 className="modal-title">Your Favorite Café? ☕</h2>
                        <input
                            className="input-cafe"
                            placeholder="Name of your favorite café"
                            value={favoriteCafe}
                            onChange={(e) => setFavoriteCafe(e.target.value)}
                        />
                        <input
                            className="input-cafe"
                            placeholder="When will you be free?"
                            value={timing}
                            onChange={(e) => setTiming(e.target.value)}
                        />
                        <textarea
                            className="input-note"
                            placeholder="Optional note for Pushkar ☺️"
                            value={optionalNote}
                            onChange={(e) => setOptionalNote(e.target.value)}
                        />
                        <div className="modal-actions">
                            <button className="submit-button" onClick={handleSubmit}>
                            Accept Invite
                            </button>
                            <button className="close-button" onClick={() => setShowModal(false)}>
                            Cancel
                            </button>
                        </div>
                        </>
                    ) : (
                        // ✅ Personalized Appreciation Message Display for 3 seconds clearly
                        <div className="success-message">
                            {successMessage}
                        </div>
                    )}
                    </motion.div>
                </motion.div>
                )}
            </AnimatePresence>
            
          </div>

          {showGhibli && (
            <div className="ghibli-background">
              <img src={`src/assets/${her_name}_Pushkar.jpeg`} alt="Ghibli Background" className="ghibli-image" />
            </div>
          )}

        </div>
      </div>
      ): <h1>You are not Logged in!</h1>
      }
      </>
    );
  }