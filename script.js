"use strict";


/* ============================================================
   ACCESSEASE
   Complete JavaScript
============================================================ */


/* ============================================================
   DOM REFERENCES
============================================================ */

const body = document.body;


/* Navigation */

const menuToggle = document.getElementById("menu-toggle");
const mainNavigation = document.getElementById("main-navigation");
const navLinks = document.querySelectorAll(".nav-link");


/* Visual Accessibility */

const toggleDescription =
    document.getElementById("toggle-description");

const descriptionDetails =
    document.getElementById("description-details");


/* Hearing Accessibility */

const captionToggle =
    document.getElementById("caption-toggle");

const captionDisplay =
    document.getElementById("caption-display");

const transcriptToggle =
    document.getElementById("transcript-toggle");

const transcript =
    document.getElementById("transcript");


/* Motor Accessibility */

const focusModeToggle =
    document.getElementById("focus-mode-toggle");

const focusModeTitle =
    document.getElementById("focus-mode-title");

const keyboardDemoArea =
    document.getElementById("keyboard-demo-area");

const keyboardButtons =
    document.querySelectorAll(".keyboard-test");

const keyboardResult =
    document.getElementById("keyboard-result");


/* Motion Accessibility */

const motionModeToggle =
    document.getElementById("motion-mode-toggle");

const motionModeTitle =
    document.getElementById("motion-mode-title");

const motionModeDescription =
    document.getElementById("motion-mode-description");

const runMotionDemo =
    document.getElementById("run-motion-demo");

const motionStage =
    document.getElementById("motion-stage");

const motionObject =
    document.getElementById("motion-object");

const motionStatus =
    document.getElementById("motion-status");


/* Ethical Accessibility */

const ethicalButtons =
    document.querySelectorAll(".ethical-answer");


/* Accessibility Settings */

const decreaseTextButton =
    document.getElementById("decrease-text");

const increaseTextButton =
    document.getElementById("increase-text");

const textSizeValue =
    document.getElementById("text-size-value");

const contrastToggle =
    document.getElementById("contrast-toggle");

const resetSettingsButton =
    document.getElementById("reset-settings");

const settingsStatus =
    document.getElementById("settings-status");


/* Feedback */

const feedbackForm =
    document.getElementById("feedback-form");

const feedbackStatus =
    document.getElementById("feedback-status");

const savedFeedbackSection =
    document.getElementById("saved-feedback-section");

const savedFeedbackContainer =
    document.getElementById("saved-feedback");

const clearFeedbackButton =
    document.getElementById("clear-feedback");


/* Footer */

const currentYear =
    document.getElementById("current-year");


/* ============================================================
   CONSTANTS
============================================================ */

const DEFAULT_TEXT_SIZE = 100;
const MIN_TEXT_SIZE = 80;
const MAX_TEXT_SIZE = 150;
const TEXT_SIZE_STEP = 10;

const TEXT_SIZE_KEY = "accessease-text-size";
const CONTRAST_KEY = "accessease-high-contrast";
const FEEDBACK_KEY = "accessease-feedback";


/* ============================================================
   SAFE LOCAL STORAGE
============================================================ */

function saveLocal(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.warn("Unable to save to localStorage:", error);
        return false;
    }
}


function loadLocal(key, fallbackValue) {
    try {
        const storedValue = localStorage.getItem(key);

        if (storedValue === null) {
            return fallbackValue;
        }

        return JSON.parse(storedValue);

    } catch (error) {
        console.warn("Unable to read localStorage:", error);
        return fallbackValue;
    }
}


function removeLocal(key) {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.warn("Unable to remove localStorage item:", error);
    }
}


/* ============================================================
   MOBILE NAVIGATION
============================================================ */

if (menuToggle && mainNavigation) {

    menuToggle.addEventListener("click", () => {

        const isOpen =
            mainNavigation.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });


    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            mainNavigation.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });


    document.addEventListener("click", (event) => {

        const clickedInsideNavigation =
            mainNavigation.contains(event.target);

        const clickedMenuButton =
            menuToggle.contains(event.target);

        if (
            !clickedInsideNavigation &&
            !clickedMenuButton
        ) {
            mainNavigation.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );
        }

    });

}


/* ============================================================
   ACTIVE NAVIGATION
============================================================ */

const observedSections = [
    "home",
    "lab",
    "pour",
    "settings",
    "mobile-design",
    "feedback"
]
.map((id) => document.getElementById(id))
.filter(Boolean);


if (
    observedSections.length > 0 &&
    "IntersectionObserver" in window
) {

    const sectionObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const currentId =
                        entry.target.id;

                    navLinks.forEach((link) => {

                        const target =
                            link.getAttribute("href");

                        link.classList.toggle(
                            "active",
                            target === `#${currentId}`
                        );

                    });

                });

            },
            {
                root: null,
                rootMargin: "-35% 0px -55% 0px",
                threshold: 0
            }
        );


    observedSections.forEach((section) => {
        sectionObserver.observe(section);
    });

}


/* ============================================================
   VISUAL ACCESSIBILITY DEMO
============================================================ */

if (
    toggleDescription &&
    descriptionDetails
) {

    toggleDescription.addEventListener(
        "click",
        () => {

            const isCurrentlyHidden =
                descriptionDetails.hidden;

            descriptionDetails.hidden =
                !isCurrentlyHidden;

            toggleDescription.setAttribute(
                "aria-expanded",
                String(isCurrentlyHidden)
            );

            toggleDescription.textContent =
                isCurrentlyHidden
                    ? "Hide Explanation"
                    : "Why is this useful?";

        }
    );

}


/* ============================================================
   HEARING ACCESSIBILITY DEMO
============================================================ */

let captionsEnabled = false;


if (
    captionToggle &&
    captionDisplay
) {

    captionToggle.addEventListener(
        "click",
        () => {

            captionsEnabled =
                !captionsEnabled;

            captionToggle.setAttribute(
                "aria-pressed",
                String(captionsEnabled)
            );

            if (captionsEnabled) {

                captionDisplay.textContent =
                    "Enrollment for the first semester begins Monday at 8:00 AM.";

                captionToggle.textContent =
                    "Turn Captions Off";

            } else {

                captionDisplay.textContent = "";

                captionToggle.textContent =
                    "Turn Captions On";
            }

        }
    );

}


if (
    transcriptToggle &&
    transcript
) {

    transcriptToggle.addEventListener(
        "click",
        () => {

            const willShow =
                transcript.hidden;

            transcript.hidden =
                !willShow;

            transcriptToggle.setAttribute(
                "aria-expanded",
                String(willShow)
            );

            transcriptToggle.textContent =
                willShow
                    ? "Hide Transcript"
                    : "Show Transcript";

        }
    );

}


/* ============================================================
   MOTOR ACCESSIBILITY
   HIGH-VISIBILITY KEYBOARD FOCUS DEMO
============================================================ */

let highVisibilityFocusEnabled = false;


if (
    focusModeToggle &&
    keyboardDemoArea &&
    focusModeTitle
) {

    focusModeToggle.addEventListener(
        "click",
        () => {

            highVisibilityFocusEnabled =
                !highVisibilityFocusEnabled;


            keyboardDemoArea.classList.toggle(
                "high-visibility-focus",
                highVisibilityFocusEnabled
            );


            focusModeToggle.setAttribute(
                "aria-pressed",
                String(highVisibilityFocusEnabled)
            );


            if (highVisibilityFocusEnabled) {

                focusModeTitle.textContent =
                    "High-Visibility Focus";

                focusModeToggle.textContent =
                    "Use Normal Focus";

                keyboardResult.textContent =
                    "High-visibility focus is enabled. Press Tab to compare.";

            } else {

                focusModeTitle.textContent =
                    "Normal Focus";

                focusModeToggle.textContent =
                    "Enable High-Visibility Focus";

                keyboardResult.textContent =
                    "Normal focus is enabled. Press Tab to compare.";
            }


            /*
             Move focus to the first demo button.
             This lets the user immediately see the difference.
            */

            const firstKeyboardButton =
                keyboardButtons[0];

            if (firstKeyboardButton) {
                firstKeyboardButton.focus();
            }

        }
    );

}


keyboardButtons.forEach((button) => {

    button.addEventListener(
        "click",
        () => {

            const action =
                button.dataset.action || "Button";

            keyboardResult.textContent =
                `${action} button activated using the interface.`;

        }
    );


    button.addEventListener(
        "focus",
        () => {

            const action =
                button.dataset.action || "Button";

            keyboardResult.textContent =
                `${action} button currently has keyboard focus.`;

        }
    );

});


/* ============================================================
   MOTION ACCESSIBILITY DEMO
============================================================ */

let reducedMotionDemoEnabled = false;
let motionTimer = null;


function resetMotionObject() {

    if (!motionObject || !motionStage) {
        return;
    }

    motionObject.classList.remove("run");

    motionStage.classList.remove(
        "normal-motion",
        "reduced-motion"
    );

    /*
     Force browser reflow so the animation
     can run again when requested.
    */

    void motionObject.offsetWidth;
}


if (
    motionModeToggle &&
    motionModeTitle &&
    motionModeDescription
) {

    motionModeToggle.addEventListener(
        "click",
        () => {

            reducedMotionDemoEnabled =
                !reducedMotionDemoEnabled;


            motionModeToggle.setAttribute(
                "aria-pressed",
                String(reducedMotionDemoEnabled)
            );


            resetMotionObject();


            if (reducedMotionDemoEnabled) {

                motionModeTitle.textContent =
                    "Reduced Motion";

                motionModeDescription.textContent =
                    "The same result is shown with little or no movement.";

                motionModeToggle.textContent =
                    "Use Normal Motion";

                motionStatus.textContent =
                    "Reduced motion selected. Run the demonstration to compare.";

            } else {

                motionModeTitle.textContent =
                    "Normal Motion";

                motionModeDescription.textContent =
                    "The demonstration uses a visible sliding animation.";

                motionModeToggle.textContent =
                    "Use Reduced Motion";

                motionStatus.textContent =
                    "Normal motion selected. Run the demonstration to compare.";
            }

        }
    );

}


if (
    runMotionDemo &&
    motionStage &&
    motionObject
) {

    runMotionDemo.addEventListener(
        "click",
        () => {

            if (motionTimer) {
                clearTimeout(motionTimer);
            }


            resetMotionObject();


            if (reducedMotionDemoEnabled) {

                motionStage.classList.add(
                    "reduced-motion"
                );

                /*
                 The object changes position immediately.
                */

                requestAnimationFrame(() => {

                    motionObject.classList.add("run");

                    motionStatus.textContent =
                        "Reduced motion: the card reached the same destination without the long sliding animation.";

                });

            } else {

                motionStage.classList.add(
                    "normal-motion"
                );

                requestAnimationFrame(() => {

                    motionObject.classList.add("run");

                    motionStatus.textContent =
                        "Normal motion: the card is moving across the interface.";

                });


                motionTimer = setTimeout(
                    () => {

                        motionStatus.textContent =
                            "Normal motion complete. The card used sliding, scaling, and small rotation effects.";

                    },
                    1700
                );
            }

        }
    );

}


/* ============================================================
   ETHICAL ACCESSIBILITY
============================================================ */

ethicalButtons.forEach((button) => {

    button.addEventListener(
        "click",
        () => {

            const targetId =
                button.dataset.target;

            if (!targetId) {
                return;
            }

            const explanation =
                document.getElementById(targetId);

            if (!explanation) {
                return;
            }

            const willShow =
                explanation.hidden;

            explanation.hidden =
                !willShow;

            button.setAttribute(
                "aria-expanded",
                String(willShow)
            );

            button.textContent =
                willShow
                    ? "Hide Explanation"
                    : "Why does this matter?";

        }
    );

});


/* ============================================================
   ACCESSIBILITY SETTINGS
   TEXT SIZE
============================================================ */

let currentTextSize =
    Number(
        loadLocal(
            TEXT_SIZE_KEY,
            DEFAULT_TEXT_SIZE
        )
    );


if (
    Number.isNaN(currentTextSize) ||
    currentTextSize < MIN_TEXT_SIZE ||
    currentTextSize > MAX_TEXT_SIZE
) {
    currentTextSize =
        DEFAULT_TEXT_SIZE;
}


function applyTextSize() {

    document.documentElement.style.fontSize =
        `${currentTextSize}%`;

    if (textSizeValue) {
        textSizeValue.textContent =
            `${currentTextSize}%`;
    }


    if (decreaseTextButton) {

        decreaseTextButton.disabled =
            currentTextSize <= MIN_TEXT_SIZE;

    }


    if (increaseTextButton) {

        increaseTextButton.disabled =
            currentTextSize >= MAX_TEXT_SIZE;

    }

}


if (decreaseTextButton) {

    decreaseTextButton.addEventListener(
        "click",
        () => {

            currentTextSize =
                Math.max(
                    MIN_TEXT_SIZE,
                    currentTextSize - TEXT_SIZE_STEP
                );

            applyTextSize();

            saveLocal(
                TEXT_SIZE_KEY,
                currentTextSize
            );

            showSettingsStatus(
                `Text size changed to ${currentTextSize}%.`
            );

        }
    );

}


if (increaseTextButton) {

    increaseTextButton.addEventListener(
        "click",
        () => {

            currentTextSize =
                Math.min(
                    MAX_TEXT_SIZE,
                    currentTextSize + TEXT_SIZE_STEP
                );

            applyTextSize();

            saveLocal(
                TEXT_SIZE_KEY,
                currentTextSize
            );

            showSettingsStatus(
                `Text size changed to ${currentTextSize}%.`
            );

        }
    );

}


/* ============================================================
   HIGH CONTRAST
============================================================ */

function applyHighContrast(enabled) {

    body.classList.toggle(
        "high-contrast",
        enabled
    );

    if (contrastToggle) {
        contrastToggle.checked = enabled;
    }

}


if (contrastToggle) {

    contrastToggle.addEventListener(
        "change",
        () => {

            const enabled =
                contrastToggle.checked;

            applyHighContrast(enabled);

            saveLocal(
                CONTRAST_KEY,
                enabled
            );

            showSettingsStatus(
                enabled
                    ? "High contrast enabled."
                    : "High contrast disabled."
            );

        }
    );

}


/* ============================================================
   SETTINGS STATUS
============================================================ */

let settingsStatusTimer = null;


function showSettingsStatus(message) {

    if (!settingsStatus) {
        return;
    }

    settingsStatus.textContent =
        message;


    if (settingsStatusTimer) {
        clearTimeout(settingsStatusTimer);
    }


    settingsStatusTimer =
        setTimeout(
            () => {
                settingsStatus.textContent = "";
            },
            3500
        );

}


/* ============================================================
   RESET SETTINGS
============================================================ */

if (resetSettingsButton) {

    resetSettingsButton.addEventListener(
        "click",
        () => {

            currentTextSize =
                DEFAULT_TEXT_SIZE;

            applyTextSize();


            applyHighContrast(false);


            removeLocal(TEXT_SIZE_KEY);
            removeLocal(CONTRAST_KEY);


            showSettingsStatus(
                "Accessibility settings reset."
            );

        }
    );

}


/* ============================================================
   INITIALIZE SETTINGS
============================================================ */

function initializeSettings() {

    applyTextSize();


    const savedContrast =
        Boolean(
            loadLocal(
                CONTRAST_KEY,
                false
            )
        );

    applyHighContrast(savedContrast);

}


initializeSettings();


/* ============================================================
   FEEDBACK
============================================================ */

function getSavedFeedback() {

    const feedback =
        loadLocal(
            FEEDBACK_KEY,
            []
        );

    return Array.isArray(feedback)
        ? feedback
        : [];

}


/* Safe element creation */

function createTextElement(
    tagName,
    text,
    className = ""
) {

    const element =
        document.createElement(tagName);

    element.textContent = text;

    if (className) {
        element.className = className;
    }

    return element;

}


/* Render feedback safely */

function renderFeedback() {

    if (
        !savedFeedbackContainer ||
        !savedFeedbackSection
    ) {
        return;
    }


    const feedbackItems =
        getSavedFeedback();


    savedFeedbackContainer.innerHTML = "";


    if (feedbackItems.length === 0) {

        savedFeedbackSection.hidden = true;
        return;
    }


    savedFeedbackSection.hidden = false;


    feedbackItems
        .slice()
        .reverse()
        .forEach((item) => {

            const card =
                document.createElement("article");

            card.className =
                "feedback-item";


            const header =
                document.createElement("div");

            header.className =
                "feedback-item-header";


            const person =
                createTextElement(
                    "strong",
                    item.name || "Anonymous"
                );


            const rating =
                createTextElement(
                    "span",
                    `${item.rating}/5`
                );


            header.append(
                person,
                rating
            );


            const category =
                createTextElement(
                    "p",
                    `Category: ${item.category}`
                );


            const message =
                createTextElement(
                    "p",
                    item.message
                );


            const date =
                createTextElement(
                    "small",
                    item.date
                );


            card.append(
                header,
                category,
                message,
                date
            );


            savedFeedbackContainer.appendChild(
                card
            );

        });

}


/* Save feedback */

if (feedbackForm) {

    feedbackForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            const formData =
                new FormData(feedbackForm);


            const name =
                String(
                    formData.get("name") || ""
                ).trim();


            const category =
                String(
                    formData.get("category") || ""
                ).trim();


            const rating =
                String(
                    formData.get("rating") || ""
                ).trim();


            const message =
                String(
                    formData.get("message") || ""
                ).trim();


            if (
                !category ||
                !rating ||
                !message
            ) {

                if (feedbackStatus) {

                    feedbackStatus.textContent =
                        "Please complete the required feedback fields.";

                }

                return;
            }


            const feedbackItems =
                getSavedFeedback();


            const feedbackEntry = {
                name,
                category,
                rating,
                message,

                date:
                    new Date().toLocaleString()
            };


            feedbackItems.push(
                feedbackEntry
            );


            const saved =
                saveLocal(
                    FEEDBACK_KEY,
                    feedbackItems
                );


            if (!saved) {

                if (feedbackStatus) {

                    feedbackStatus.textContent =
                        "The browser could not save the feedback.";

                }

                return;
            }


            feedbackForm.reset();


            if (feedbackStatus) {

                feedbackStatus.textContent =
                    "Thank you. Your prototype feedback was saved in this browser.";

            }


            renderFeedback();

        }
    );

}


/* Clear feedback */

if (clearFeedbackButton) {

    clearFeedbackButton.addEventListener(
        "click",
        () => {

            const confirmed =
                window.confirm(
                    "Clear all locally saved prototype feedback?"
                );


            if (!confirmed) {
                return;
            }


            removeLocal(FEEDBACK_KEY);

            renderFeedback();


            if (feedbackStatus) {

                feedbackStatus.textContent =
                    "Saved feedback was cleared.";

            }

        }
    );

}


/* Initial feedback render */

renderFeedback();


/* ============================================================
   FOOTER YEAR
============================================================ */

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}