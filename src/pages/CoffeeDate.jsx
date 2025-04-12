import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/CoffeeDate.css'

// Import your local images
import herPhoto from '../assets/her_photo.jpeg';
import myPhoto from '../assets/me.jpeg';
import coffeeCupImg from '../assets/coffee_cup.jpeg'; 
import heartCoffeeImg from '../assets/heart_coffee.jpeg';

export default function CoffeeDateInvite() {
    const [response, setResponse] = useState(null);
    const [favoriteCafe, setFavoriteCafe] = useState('');
    const [timing, setTiming] = useState('');
    const [optionalNote, setOptionalNote] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = () => {
        if (!favoriteCafe.trim()) {
        alert("Please enter your favorite café!");
        return;
        }

        console.log('Favorite Cafe:', favoriteCafe);
        console.log('Note:', optionalNote);

        setResponse('sure');
        setShowModal(false);
        
        // Optional: perform additional logic (e.g. API call)
    };
  
    return (
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
            <h1 className="card-title">How About a Coffee?</h1>
            <div className="coffee-steam">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <div className="photo-grid photo-grid-top">
            <div className="photo-container">
              <img src={myPhoto} alt="Me" className="grid-photo" />
              <div class="note-overlay">What does Pushkar want?</div>
            </div>
            <div className="photo-container">
              <img src={coffeeCupImg} alt="Coffee cup with hearts" className="grid-photo" />
              <div class="note-overlay">I think Pushkar wants to drink a coffee with Tanisha!</div>
            </div>
          </div>

          <p className="invitation-text">
            I know a great place that we could go. Let's have coffee together soon!
          </p>
  
          <div className="photo-grid photo-grid-bottom">
            <div className="photo-container">
              <img src={heartCoffeeImg} alt="Coffee with heart" className="grid-photo" />
              <div class="note-overlay">I think Pushkar wants to go on Coffee date with Tanisha, but will she go on a date with Pushkar?!</div>
            </div>
            <div className="photo-container">
              <img src={herPhoto} alt="Her" className="grid-photo" />
              <div class="note-overlay">Tanisha here and I will decide whether to go or not with this Banarasi guy...</div>
            </div>
          </div>
  
          <div className="response-section">
            {response === null ? (
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
                        Submit
                        </button>
                        <button className="close-button" onClick={() => setShowModal(false)}>
                        Cancel
                        </button>
                    </div>
                    </motion.div>
                </motion.div>
                )}
            </AnimatePresence>
            </div>
        </div>
      </div>
    );
  }