import { useState } from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

interface ActionProps<T> {
  item: T;
  labels: string[];
  onSelected: (name: string, item: T) => void;
}
function Action<T>({ labels, item, onSelected }: ActionProps<T>) {
  const [state, setState] = useState(false);

  const showDetails = () => setState((prevState) => !prevState);

  return (
    <ClickAwayListener onClickAway={() => setState(false)}>
      <div className="action-container">
        {state ? (
          <>
            <div className="action" onClick={showDetails}>
              <div>Actions</div>
              <div className="icon">
                <p>&#x25BE;</p>
              </div>
            </div>
            <div className="action-drop">
              {labels.map((label, index) => (
                <div
                  onClick={() => {
                    onSelected(label, item);
                    setState(false);
                  }}
                  key={index.toString()}
                >
                  {label}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="action" onClick={showDetails}>
            <div>Actions</div>
            <div className="icon">
              <p>&#x25B4;</p>
            </div>
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
}

export default Action;
