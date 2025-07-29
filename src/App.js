import React, { useState, useRef } from 'react';

const ROLE_COLORS = {
  setter: 'orange',
  libero: 'blue',
  opposite: 'red',
  outside: 'gold',
  defensive_specialist_1: 'green',
  defensive_specialist_2: 'purple',
};



function triggerFileInput() {
  document.getElementById('session-file').click();
}

function App() {
 
  const [points, setPoints] = useState([]);
  const [currentRole, setCurrentRole] = useState('setter');
  const [playerName, setPlayerName] = useState('');
  const courtRef = useRef(null);

  // Add point where user clicks on court image
  function handleCourtClick(e) {
    if (!playerName) {
      alert('Please enter player name');
      return;
    }

    const rect = courtRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPoints((pts) => [...pts, { x, y, player: playerName, role: currentRole }]);
    setPlayerName('');
  }

  // Export points as JSON file
  function exportJSON() {
    const session = {
      session_name: 'My Volleyball Session',
      points,
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(session, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "volleyball_session.json");
    dlAnchorElem.click();
  }

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>Volleyball Session Point Mapper</h1>

      <div style={{ marginBottom: 10 }}>
        <label>
          Player Name:{" "}
          <input
            type="text"
            value={playerName}
            onChange={e => setPlayerName(e.target.value)}
            placeholder="Enter player name"
          />
        </label>
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>
          Role:{" "}
          <select value={currentRole} onChange={e => setCurrentRole(e.target.value)}>
            {Object.keys(ROLE_COLORS).map(role => (
              <option key={role} value={role}>
                {role.replace(/_/g, ' ')}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div
        style={{
          position: 'relative',
          display: 'inline-block',
          border: '2px solid #333',
          cursor: 'crosshair',
        }}
        onClick={handleCourtClick}
        ref={courtRef}
      >
        <img
  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAY8AAAE8CAYAAAA4xD08AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAPfaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49J++7vycgaWQ9J1c1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCc/Pg0KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyI+PHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj48cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0idXVpZDpmYWY1YmRkNS1iYTNkLTExZGEtYWQzMS1kMzNkNzUxODJmMWIiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyI+PGRjOmNyZWF0b3I+PHJkZjpTZXEgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj48cmRmOmxpPnRoZW5hdGNoZGw8L3JkZjpsaT48L3JkZjpTZXE+DQoJCQk8L2RjOmNyZWF0b3I+PC9yZGY6RGVzY3JpcHRpb24+PHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9InV1aWQ6ZmFmNWJkZDUtYmEzZC0xMWRhLWFkMzEtZDMzZDc1MTgyZjFiIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iPjxkYzp0aXRsZT48cmRmOkFsdCB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPjxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+Vm9sbGV5YmFsbCBjb3VydCBmcm9tIHRvcCB2aWV3IGZsYXQgZGVzaWduLCB2ZWN0b3IgaWxsdXN0cmF0aW9uPC9yZGY6bGk+PC9yZGY6QWx0Pg0KCQkJPC9kYzp0aXRsZT48L3JkZjpEZXNjcmlwdGlvbj48cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0idXVp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"
  alt="Volleyball Court"
  style={{ display: 'block', maxWidth: '600px', width: '100%', height: 'auto' }}
/>



{points.map((pt, i) => (
  <div
    key={i}
    title={`${pt.player} (${pt.role.replace(/_/g, ' ')})`}
    onClick={() => {
      if (window.confirm(`Delete point from ${pt.player}?`)) {
        setPoints(prev => prev.filter((_, index) => index !== i));
      }
    }}
    style={{
      position: 'absolute',
      left: pt.x - 6,
      top: pt.y - 6,
      width: 12,
      height: 12,
      borderRadius: '50%',
      backgroundColor: ROLE_COLORS[pt.role],
      border: '2px solid white',
      cursor: 'pointer',
    }}
  />
))}
{points.length > 0 && (
  <div style={{ marginTop: 30 }}>
    <h3>Points Added</h3>
    <ul>
      {points.map((pt, index) => (
        <li key={index}>
          {pt.player} ({pt.role.replace(/_/g, ' ')}) at ({Math.round(pt.x)}, {Math.round(pt.y)})
        </li>
      ))}
    </ul>
  </div>
)}


      </div>
      <div style={{ marginTop: 20, display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
  <button onClick={exportJSON} disabled={points.length === 0}>
    Export Session JSON
  </button>

  <button
    onClick={() => {
      if (window.confirm("Are you sure you want to reset all points?")) {
        setPoints([]);
      }
    }}
    disabled={points.length === 0}
    style={{ backgroundColor: '#900', color: '#fff' }}
  >
    Reset Points
  </button>
  

  <button
    onClick={() => {
      if (points.length > 0) {
        setPoints(prev => prev.slice(0, prev.length - 1));
      }
    }}
    disabled={points.length === 0}
    style={{ backgroundColor: '#555', color: '#fff' }}
  >
    Undo Last Point
  </button>
</div>

      <h3 style={{ marginTop: 40 }}>Legend</h3>
      <ul>
        {Object.entries(ROLE_COLORS).map(([role, color]) => (
          <li key={role}>
            <span
              style={{
                display: 'inline-block',
                width: 15,
                height: 15,
                backgroundColor: color,
                marginRight: 8,
                verticalAlign: 'middle',
              }}
            />
            {role.replace(/_/g, ' ')}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
