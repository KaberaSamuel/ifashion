import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export function MessagePopups({ popupsArray }) {
  const messagesRef = useRef(null);
  const messagesNode = messagesRef.current;

  return (
    <div className="popups-container" ref={messagesRef}>
      {popupsArray.map((message, index) => (
        <div
          key={index}
          className="popup"
          onAnimationEnd={(e) => {
            if (
              e.animationName === "slide-out" ||
              e.animationName === "immediate-remove"
            ) {
              messagesNode.removeChild(e.target);
            }
          }}
        >
          <div className="icon">
            <FontAwesomeIcon
              icon={faXmark}
              onClick={(e) => {
                const messageParent =
                  e.currentTarget.parentElement.parentElement;
                messageParent.classList.add("immediate-remove");
              }}
            />
          </div>
          <p>{message}</p>
          <div className="loader">
            <div className="filler"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
