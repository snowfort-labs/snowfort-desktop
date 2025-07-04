import React from 'react';
import { useAppStore } from '../store/appStore';
import { TerminalComponent } from './Terminal';
import { ProjectView } from './ProjectView';

export const TerminalPanel: React.FC = () => {
  const { activeSession, activeProject } = useAppStore();

  // Show project view if project is selected but no session
  if (activeProject && !activeSession) {
    return <ProjectView project={activeProject} />;
  }

  // Show empty state if neither project nor session is selected
  if (!activeSession || !activeProject) {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div className="panel-header">
          Terminal Session
        </div>
        <div className="empty-state">
          <div>
            <div className="empty-state-icon">📺</div>
            <p>Select a session to start working</p>
            <p style={{ fontSize: 14, marginTop: 8 }}>Choose a project session from the left panel</p>
          </div>
        </div>
      </div>
    );
  }

  const getEngineName = (engineType?: string, activeEngine?: string) => {
    const engine = activeEngine || engineType;
    if (!engine) return 'Terminal Session';
    
    switch (engine) {
      case 'claude': return 'Claude Code';
      case 'codex': return 'OpenAI Codex';
      case 'gemini': return 'Gemini CLI';
      default: return 'Terminal Session';
    }
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="panel-header">
        <span>{activeProject.name}</span>
        <span>•</span>
        <span style={{ color: activeSession.status === 'ready' ? '#10b981' : activeSession.status === 'working' ? '#f59e0b' : '#6b7280' }}>
          {getEngineName(activeSession.engineType, activeSession.activeEngine)}
        </span>
        <div style={{ marginLeft: 'auto' }}>
          <button className="shortcut-btn">⚙️ Config</button>
        </div>
      </div>
      
      <TerminalComponent
        session={activeSession}
        engineType={activeSession.engineType}
        projectPath={activeProject.path}
        onStateChange={() => {
          // Update session status in store
          // This will be implemented when we add the store actions
        }}
      />
      
      <div className="shortcuts">
        <button className="shortcut-btn">🧪 Run Tests</button>
        <button className="shortcut-btn">💾 Commit Changes</button>
        <button className="shortcut-btn">📋 Explain Code</button>
        <button className="shortcut-btn">🔧 Fix Errors</button>
      </div>
    </div>
  );
};