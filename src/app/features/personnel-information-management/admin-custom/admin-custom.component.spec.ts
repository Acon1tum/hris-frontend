import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminCustomComponent } from './admin-custom.component';
import { FormsModule } from '@angular/forms';

describe('AdminCustomComponent', () => {
  let component: AdminCustomComponent;
  let fixture: ComponentFixture<AdminCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCustomComponent, FormsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default active tab as alerts', () => {
    expect(component.activeTab).toBe('alerts');
  });

  it('should change active tab when setActiveTab is called', () => {
    component.setActiveTab('rules');
    expect(component.activeTab).toBe('rules');
    
    component.setActiveTab('reports');
    expect(component.activeTab).toBe('reports');
  });

  it('should mark alert as read', () => {
    const alertId = 1;
    const alert = component.alerts.find(a => a.id === alertId);
    expect(alert?.isRead).toBe(false);
    
    component.markAlertAsRead(alertId);
    expect(alert?.isRead).toBe(true);
  });

  it('should delete alert', () => {
    const initialCount = component.alerts.length;
    const alertId = 1;
    
    component.deleteAlert(alertId);
    expect(component.alerts.length).toBe(initialCount - 1);
    expect(component.alerts.find(a => a.id === alertId)).toBeUndefined();
  });

  it('should get correct unread alerts count', () => {
    const unreadCount = component.alerts.filter(a => !a.isRead).length;
    expect(component.getUnreadAlertsCount()).toBe(unreadCount);
  });

  it('should create new alert rule', () => {
    const initialCount = component.alertRules.length;
    component.newRule = {
      name: 'Test Rule',
      description: 'Test Description',
      condition: 'test_condition',
      severity: 'medium',
      notifications: ['email']
    };
    
    component.createNewRule();
    expect(component.alertRules.length).toBe(initialCount + 1);
    expect(component.alertRules[component.alertRules.length - 1].name).toBe('Test Rule');
  });

  it('should delete alert rule', () => {
    const initialCount = component.alertRules.length;
    const ruleId = 1;
    
    component.deleteRule(ruleId);
    expect(component.alertRules.length).toBe(initialCount - 1);
    expect(component.alertRules.find(r => r.id === ruleId)).toBeUndefined();
  });

  it('should toggle rule status', () => {
    const ruleId = 1;
    const rule = component.alertRules.find(r => r.id === ruleId);
    const initialStatus = rule?.isActive;
    
    component.toggleRuleStatus(ruleId);
    expect(rule?.isActive).toBe(!initialStatus);
  });

  it('should create new report', () => {
    const initialCount = component.reports.length;
    component.newReport = {
      name: 'Test Report',
      description: 'Test Description',
      type: 'chart',
      metrics: ['employee_count']
    };
    
    component.createNewReport();
    expect(component.reports.length).toBe(initialCount + 1);
    expect(component.reports[component.reports.length - 1].name).toBe('Test Report');
  });

  it('should delete report', () => {
    const initialCount = component.reports.length;
    const reportId = 1;
    
    component.deleteReport(reportId);
    expect(component.reports.length).toBe(initialCount - 1);
    expect(component.reports.find(r => r.id === reportId)).toBeUndefined();
  });

  it('should get correct alert icon', () => {
    expect(component.getAlertIcon('critical')).toBe('🚨');
    expect(component.getAlertIcon('warning')).toBe('⚠️');
    expect(component.getAlertIcon('info')).toBe('ℹ️');
    expect(component.getAlertIcon('unknown')).toBe('📢');
  });

  it('should get correct severity color', () => {
    expect(component.getSeverityColor('critical')).toBe('red');
    expect(component.getSeverityColor('high')).toBe('orange');
    expect(component.getSeverityColor('medium')).toBe('yellow');
    expect(component.getSeverityColor('low')).toBe('green');
    expect(component.getSeverityColor('unknown')).toBe('gray');
  });

  it('should toggle notification', () => {
    component.newRule.notifications = ['email'];
    
    component.toggleNotification('sms');
    expect(component.newRule.notifications).toContain('sms');
    
    component.toggleNotification('email');
    expect(component.newRule.notifications).not.toContain('email');
  });

  it('should toggle metric', () => {
    component.newReport.metrics = ['employee_count'];
    
    component.toggleMetric('department_distribution');
    expect(component.newReport.metrics).toContain('department_distribution');
    
    component.toggleMetric('employee_count');
    expect(component.newReport.metrics).not.toContain('employee_count');
  });
}); 