import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AdminCustomComponent } from './admin-custom.component';

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

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have proper title', () => {
      expect(component.title).toBe('Super Admin Custom Management');
    });

    it('should initialize with alerts tab active', () => {
      expect(component.activeTab).toBe('alerts');
    });

    it('should have sample data', () => {
      expect(component.alerts.length).toBeGreaterThan(0);
      expect(component.alertRules.length).toBeGreaterThan(0);
      expect(component.reports.length).toBeGreaterThan(0);
    });
  });

  describe('Header Section', () => {
    it('should display page title', () => {
      const titleElement = fixture.debugElement.nativeElement.querySelector('.page-title');
      expect(titleElement.textContent).toBe('Super Admin Custom Management');
    });

    it('should display page description', () => {
      const descElement = fixture.debugElement.nativeElement.querySelector('.page-description');
      expect(descElement.textContent).toContain('Super Admin tools for system monitoring');
    });
  });

  describe('Tab Navigation', () => {
    it('should render all tabs', () => {
      const tabs = fixture.debugElement.nativeElement.querySelectorAll('.tab-link');
      expect(tabs.length).toBe(3);
      expect(tabs[0].textContent).toContain('Real-time Alerts');
      expect(tabs[1].textContent).toContain('Alert Rules');
      expect(tabs[2].textContent).toContain('Custom Reports');
    });

    it('should highlight active tab', () => {
      const activeTab = fixture.debugElement.nativeElement.querySelector('.tab-active');
      expect(activeTab.textContent).toContain('Real-time Alerts');
    });

    it('should switch tabs on click', () => {
      const rulesTab = fixture.debugElement.nativeElement.querySelectorAll('.tab-link')[1];
      rulesTab.click();
      fixture.detectChanges();
      
      expect(component.activeTab).toBe('rules');
    });

    it('should display alert badge when there are unread alerts', () => {
      component.alerts = [
        { id: 1, type: 'warning', title: 'Test', message: 'Test', timestamp: new Date(), isRead: false, category: 'system' }
      ];
      fixture.detectChanges();
      
      const badge = fixture.debugElement.nativeElement.querySelector('.alert-badge');
      expect(badge).toBeTruthy();
      expect(badge.textContent).toBe('1');
    });
  });

  describe('Alerts Tab', () => {
    beforeEach(() => {
      component.setActiveTab('alerts');
      fixture.detectChanges();
    });

    it('should display alerts when tab is active', () => {
      const alertsContainer = fixture.debugElement.nativeElement.querySelector('.alerts-grid');
      expect(alertsContainer).toBeTruthy();
    });

    it('should render alert items', () => {
      const alertItems = fixture.debugElement.nativeElement.querySelectorAll('.alert-item');
      expect(alertItems.length).toBe(component.alerts.length);
    });

    it('should display alert titles and messages', () => {
      const firstAlert = fixture.debugElement.nativeElement.querySelector('.alert-item');
      const title = firstAlert.querySelector('.alert-title');
      const message = firstAlert.querySelector('.alert-message p');
      
      expect(title.textContent).toBe(component.alerts[0].title);
      expect(message.textContent).toBe(component.alerts[0].message);
    });

    it('should mark alert as read when read button clicked', () => {
      const unreadAlert = component.alerts.find(a => !a.isRead);
      if (unreadAlert) {
        component.markAlertAsRead(unreadAlert.id);
        expect(unreadAlert.isRead).toBe(true);
      }
    });

    it('should delete alert when delete button clicked', () => {
      const initialCount = component.alerts.length;
      const alertId = component.alerts[0].id;
      
      component.deleteAlert(alertId);
      
      expect(component.alerts.length).toBe(initialCount - 1);
      expect(component.alerts.find(a => a.id === alertId)).toBeUndefined();
    });

    it('should display empty state when no alerts', () => {
      component.alerts = [];
      fixture.detectChanges();
      
      const emptyState = fixture.debugElement.nativeElement.querySelector('.empty-state');
      expect(emptyState).toBeTruthy();
      expect(emptyState.textContent).toContain('No Alerts');
    });
  });

  describe('Rules Tab', () => {
    beforeEach(() => {
      component.setActiveTab('rules');
      fixture.detectChanges();
    });

    it('should display rules when tab is active', () => {
      const rulesContainer = fixture.debugElement.nativeElement.querySelector('.rules-grid');
      expect(rulesContainer).toBeTruthy();
    });

    it('should display create rule button', () => {
      const createButton = fixture.debugElement.nativeElement.querySelector('.btn-add');
      expect(createButton).toBeTruthy();
      expect(createButton.textContent).toContain('Create New Rule');
    });

    it('should render rule items', () => {
      const ruleItems = fixture.debugElement.nativeElement.querySelectorAll('.rule-item');
      expect(ruleItems.length).toBe(component.alertRules.length);
    });

    it('should display rule status badges', () => {
      const statusBadges = fixture.debugElement.nativeElement.querySelectorAll('.status-badge');
      expect(statusBadges.length).toBeGreaterThan(0);
    });

    it('should open new rule form when create button clicked', () => {
      component.onFabClick();
      expect(component.showNewRuleForm).toBe(true);
    });

    it('should toggle rule status', () => {
      const rule = component.alertRules[0];
      const originalStatus = rule.isActive;
      
      component.toggleRuleStatus(rule.id);
      
      expect(rule.isActive).toBe(!originalStatus);
    });

    it('should delete rule', () => {
      const initialCount = component.alertRules.length;
      const ruleId = component.alertRules[0].id;
      
      component.deleteRule(ruleId);
      
      expect(component.alertRules.length).toBe(initialCount - 1);
    });
  });

  describe('Reports Tab', () => {
    beforeEach(() => {
      component.setActiveTab('reports');
      fixture.detectChanges();
    });

    it('should display reports when tab is active', () => {
      const reportsContainer = fixture.debugElement.nativeElement.querySelector('.reports-grid');
      expect(reportsContainer).toBeTruthy();
    });

    it('should display create report button', () => {
      const createButton = fixture.debugElement.nativeElement.querySelector('.btn-add');
      expect(createButton).toBeTruthy();
      expect(createButton.textContent).toContain('Create New Report');
    });

    it('should render report items', () => {
      const reportItems = fixture.debugElement.nativeElement.querySelectorAll('.report-item');
      expect(reportItems.length).toBe(component.reports.length);
    });

    it('should display type badges', () => {
      const typeBadges = fixture.debugElement.nativeElement.querySelectorAll('.type-badge');
      expect(typeBadges.length).toBeGreaterThan(0);
    });

    it('should open new report form when create button clicked', () => {
      component.onFabClick();
      expect(component.showNewReportForm).toBe(true);
    });

    it('should open report modal when view button clicked', () => {
      const report = component.reports[0];
      component.viewReport(report);
      
      expect(component.showReportModal).toBe(true);
      expect(component.selectedReport).toBe(report);
    });

    it('should delete report', () => {
      const initialCount = component.reports.length;
      const reportId = component.reports[0].id;
      
      component.deleteReport(reportId);
      
      expect(component.reports.length).toBe(initialCount - 1);
    });
  });

  describe('Rule Form Modal', () => {
    beforeEach(() => {
      component.showNewRuleForm = true;
      fixture.detectChanges();
    });

    it('should display rule form modal', () => {
      const modal = fixture.debugElement.nativeElement.querySelector('.modal-overlay');
      expect(modal).toBeTruthy();
    });

    it('should create new rule', () => {
      component.newRule = {
        name: 'Test Rule',
        description: 'Test Description',
        condition: 'test_condition',
        severity: 'high',
        notifications: ['email']
      };
      
      const initialCount = component.alertRules.length;
      component.createNewRule();
      
      expect(component.alertRules.length).toBe(initialCount + 1);
      expect(component.showNewRuleForm).toBe(false);
    });

    it('should close modal when cancel clicked', () => {
      component.cancelEditRule();
      expect(component.showNewRuleForm).toBe(false);
    });

    it('should toggle notification options', () => {
      component.newRule.notifications = [];
      component.toggleNotification('email');
      
      expect(component.newRule.notifications).toContain('email');
      
      component.toggleNotification('email');
      expect(component.newRule.notifications).not.toContain('email');
    });
  });

  describe('Report Form Modal', () => {
    beforeEach(() => {
      component.showNewReportForm = true;
      fixture.detectChanges();
    });

    it('should display report form modal', () => {
      const modal = fixture.debugElement.nativeElement.querySelector('.modal-overlay');
      expect(modal).toBeTruthy();
    });

    it('should create new report', () => {
      component.newReport = {
        name: 'Test Report',
        description: 'Test Description',
        type: 'chart',
        metrics: ['employee_count']
      };
      
      const initialCount = component.reports.length;
      component.createNewReport();
      
      expect(component.reports.length).toBe(initialCount + 1);
      expect(component.showNewReportForm).toBe(false);
    });

    it('should close modal when cancel clicked', () => {
      component.cancelEditReport();
      expect(component.showNewReportForm).toBe(false);
    });

    it('should toggle metric options', () => {
      component.newReport.metrics = [];
      component.toggleMetric('employee_count');
      
      expect(component.newReport.metrics).toContain('employee_count');
      
      component.toggleMetric('employee_count');
      expect(component.newReport.metrics).not.toContain('employee_count');
    });
  });

  describe('Report View Modal', () => {
    beforeEach(() => {
      component.selectedReport = component.reports[0];
      component.showReportModal = true;
      fixture.detectChanges();
    });

    it('should display report view modal', () => {
      const modal = fixture.debugElement.nativeElement.querySelector('.modal-overlay');
      expect(modal).toBeTruthy();
    });

    it('should display report details', () => {
      const modalContent = fixture.debugElement.nativeElement.querySelector('.modal-content');
      expect(modalContent.textContent).toContain(component.selectedReport!.name);
    });

    it('should close modal', () => {
      component.closeReportModal();
      expect(component.showReportModal).toBe(false);
      expect(component.selectedReport).toBeNull();
    });

    it('should generate report', () => {
      spyOn(console, 'log');
      const reportId = component.selectedReport!.id;
      
      component.generateReport(reportId);
      
      expect(console.log).toHaveBeenCalledWith(`Generating report: ${component.selectedReport!.name}`);
    });
  });

  describe('Utility Methods', () => {
    it('should return correct alert icon', () => {
      expect(component.getAlertIcon('critical')).toBe('🚨');
      expect(component.getAlertIcon('warning')).toBe('⚠️');
      expect(component.getAlertIcon('info')).toBe('ℹ️');
      expect(component.getAlertIcon('unknown')).toBe('📢');
    });

    it('should return correct severity color', () => {
      expect(component.getSeverityColor('critical')).toBe('red');
      expect(component.getSeverityColor('high')).toBe('orange');
      expect(component.getSeverityColor('medium')).toBe('yellow');
      expect(component.getSeverityColor('low')).toBe('green');
      expect(component.getSeverityColor('unknown')).toBe('gray');
    });

    it('should count unread alerts', () => {
      const unreadCount = component.alerts.filter(a => !a.isRead).length;
      expect(component.getUnreadAlertsCount()).toBe(unreadCount);
    });
  });

  describe('Form Property Getters and Setters', () => {
    it('should handle rule name getter/setter', () => {
      component.ruleName = 'Test Rule';
      expect(component.newRule.name).toBe('Test Rule');
      expect(component.ruleName).toBe('Test Rule');
    });

    it('should handle report name getter/setter', () => {
      component.reportName = 'Test Report';
      expect(component.newReport.name).toBe('Test Report');
      expect(component.reportName).toBe('Test Report');
    });

    it('should handle editing rule properties', () => {
      const testRule = { ...component.alertRules[0] };
      component.editingRule = testRule;
      
      component.ruleName = 'Updated Rule';
      expect(component.editingRule.name).toBe('Updated Rule');
    });
  });

  describe('CRUD Operations', () => {
    it('should edit existing rule', () => {
      const rule = component.alertRules[0];
      component.editRule(rule);
      
      expect(component.editingRule).toEqual(rule);
      expect(component.showNewRuleForm).toBe(true);
    });

    it('should update existing rule', () => {
      const rule = { ...component.alertRules[0] };
      component.editingRule = rule;
      component.editingRule.name = 'Updated Rule';
      
      component.updateRule();
      
      expect(component.alertRules[0].name).toBe('Updated Rule');
      expect(component.editingRule).toBeNull();
    });

    it('should edit existing report', () => {
      const report = component.reports[0];
      component.editReport(report);
      
      expect(component.editingReport).toEqual(report);
      expect(component.showNewReportForm).toBe(true);
    });

    it('should update existing report', () => {
      const report = { ...component.reports[0] };
      component.editingReport = report;
      component.editingReport.name = 'Updated Report';
      
      component.updateReport();
      
      expect(component.reports[0].name).toBe('Updated Report');
      expect(component.editingReport).toBeNull();
    });
  });
}); 