import React, { useState } from 'react';
import {
  CheckSquare,
  Plus,
  Trash2,
  Edit3,
  Calendar,
  Tag,
  AlertCircle,
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { formatDateKey, formatDisplayDate } from '../utils/dateUtils';

export const Tasks = ({
  tasks = [],
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  onToggleTaskCompletion
}) => {
  const [activeTab, setActiveTab] = useState('today'); // 'today' | 'upcoming' | 'completed' | 'all'
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Productivity');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState(formatDateKey(new Date()));
  const [notes, setNotes] = useState('');

  const todayKey = formatDateKey(new Date());

  const filteredTasks = tasks.filter(t => {
    if (activeTab === 'today') return !t.completed && (!t.dueDate || t.dueDate === todayKey);
    if (activeTab === 'upcoming') return !t.completed && t.dueDate && t.dueDate > todayKey;
    if (activeTab === 'completed') return t.completed;
    return true;
  });

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      title: title.trim(),
      category,
      priority,
      dueDate,
      notes: notes.trim()
    });

    setTitle('');
    setNotes('');
    setIsAddModalOpen(false);
  };

  const priorityColors = {
    high: '#EF4444',
    medium: '#F59E0B',
    low: '#10B981'
  };

  return (
    <div className="anim-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '3.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '900', color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckSquare size={24} color="var(--primary-blue)" /> Daily Tasks & Action Items
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
            Lightweight, high-leverage execution. Keep tasks simple and directly tied to your daily focus.
          </p>
        </div>

        <Button variant="primary" onClick={() => setIsAddModalOpen(true)} icon={Plus}>
          Add Task
        </Button>
      </div>

      {/* Filter Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '0.4rem',
          backgroundColor: 'var(--bg-card)',
          padding: '0.35rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
          width: 'fit-content'
        }}
      >
        <button
          type="button"
          onClick={() => setActiveTab('today')}
          style={tabBtnStyle(activeTab === 'today')}
        >
          Today ({tasks.filter(t => !t.completed && (!t.dueDate || t.dueDate === todayKey)).length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('upcoming')}
          style={tabBtnStyle(activeTab === 'upcoming')}
        >
          Upcoming ({tasks.filter(t => !t.completed && t.dueDate && t.dueDate > todayKey).length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('completed')}
          style={tabBtnStyle(activeTab === 'completed')}
        >
          Completed ({tasks.filter(t => t.completed).length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('all')}
          style={tabBtnStyle(activeTab === 'all')}
        >
          All Tasks ({tasks.length})
        </button>
      </div>

      {/* Task List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        {filteredTasks.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '3rem 1.5rem', color: 'var(--text-secondary)' }}>
            <CheckSquare size={36} color="var(--text-muted)" style={{ margin: '0 auto 0.75rem auto' }} />
            <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
              No tasks in this view
            </h4>
            <p style={{ fontSize: '0.85rem', maxWidth: '360px', margin: '0 auto 1.25rem auto' }}>
              Everything is clear. Create a focused task to keep your execution smooth.
            </p>
            <Button variant="primary" size="sm" onClick={() => setIsAddModalOpen(true)} icon={Plus}>
              Create Task
            </Button>
          </div>
        ) : (
          filteredTasks.map(task => {
            const pColor = priorityColors[task.priority] || '#3B82F6';

            return (
              <div
                key={task.id}
                className="anim-scale-in"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.9rem 1.25rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderLeft: `4px solid ${pColor}`,
                  opacity: task.completed ? 0.7 : 1,
                  transition: 'all 0.15s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <button
                    type="button"
                    onClick={() => onToggleTaskCompletion(task.id)}
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '6px',
                      backgroundColor: task.completed ? '#2563EB' : 'transparent',
                      border: `2px solid ${task.completed ? '#2563EB' : 'var(--border-medium)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      cursor: 'pointer',
                      flexShrink: 0
                    }}
                  >
                    {task.completed && <CheckCircle2 size={15} />}
                  </button>

                  <div>
                    <div
                      style={{
                        fontSize: '0.95rem',
                        fontWeight: '700',
                        color: 'var(--text-primary)',
                        textDecoration: task.completed ? 'line-through' : 'none'
                      }}
                    >
                      {task.title}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem', flexWrap: 'wrap' }}>
                      <span
                        style={{
                          fontSize: '0.675rem',
                          fontWeight: '800',
                          textTransform: 'uppercase',
                          color: pColor,
                          backgroundColor: `${pColor}15`,
                          padding: '0.1rem 0.4rem',
                          borderRadius: '4px'
                        }}
                      >
                        {task.priority}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        📂 {task.category}
                      </span>
                      {task.dueDate && (
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                          📅 {task.dueDate === todayKey ? 'Due Today' : task.dueDate}
                        </span>
                      )}
                    </div>

                    {task.notes && (
                      <div style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                        {task.notes}
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => onToggleTaskCompletion(task.id)}
                    className={`btn btn-sm ${task.completed ? 'btn-secondary' : 'btn-primary'}`}
                    style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
                  >
                    {task.completed ? 'Done ✓' : 'Complete'}
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteTask(task.id)}
                    className="btn btn-ghost btn-icon btn-sm"
                    style={{ color: '#EF4444' }}
                    title="Delete task"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add Task Modal */}
      {isAddModalOpen && (
        <div
          className="anim-fade-in"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
        >
          <div
            className="card anim-scale-in"
            style={{
              width: '100%',
              maxWidth: '460px',
              backgroundColor: 'var(--bg-card)',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem'
            }}
          >
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
              Create Action Task
            </h3>

            <form onSubmit={handleCreateTask} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Task Title</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Finish client presentation deck"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  autoFocus
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Priority</label>
                  <select
                    className="form-select"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value="high">🔴 High Priority</option>
                    <option value="medium">🟡 Medium Priority</option>
                    <option value="low">🟢 Low Priority</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="Productivity">Productivity</option>
                    <option value="Focus">Focus</option>
                    <option value="Learning">Learning</option>
                    <option value="Health">Health</option>
                    <option value="Personal">Personal</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Due Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Notes (Optional)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Context or links..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
                <Button variant="secondary" type="button" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Save Task
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const tabBtnStyle = (isActive) => ({
  padding: '0.45rem 0.85rem',
  borderRadius: 'var(--radius-sm)',
  border: 'none',
  fontSize: '0.825rem',
  fontWeight: '800',
  backgroundColor: isActive ? 'var(--primary-blue)' : 'transparent',
  color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
  cursor: 'pointer',
  transition: 'all 0.15s'
});
