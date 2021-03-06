ngDescribe({
  name: 'Angular-progress indicator in progress',
  modules: 'platanus.progress',
  exposeApi: true,
  parentScope: { progressData: { loaded: 3500, total: 10000 } },
  element: '<progress progress-data="progressData"></progress>',

  tests: function (deps) {
    it('renders element', function () {
      expect(deps.element.hasClass('progress')).toBe(true);
    });

    it('render progress', function(){
      expect(deps.element.text()).toBe('35%');
    });

    it('shows in-progress class', function(){
      expect(deps.element.hasClass('in-progress')).toBe(true);
    });

    it('shows inner-bar', function() {
      expect(deps.element.html()).not.toMatch('inner-bar');
    });
  }
});

ngDescribe({
  name: 'Angular-progress indicator completed',
  modules: 'platanus.progress',
  exposeApi: true,
  parentScope: { progressData: { loaded: 10000, total: 10000 } },
  element: '<progress progress-data="progressData"></progress>',

  tests: function (deps) {
    it('render progress', function(){
      expect(deps.element.text()).toBe('100%');
    });

    it('shows completed class', function(){
      expect(deps.element.hasClass('completed')).toBe(true);
    });
  }
});

ngDescribe({
  name: 'Angular-progress indicator with errors',
  modules: 'platanus.progress',
  exposeApi: true,
  parentScope: { progressData: { loaded: 3500, total: 10000, error: true } },
  element: '<progress progress-data="progressData"></progress>',

  tests: function (deps) {
    it('shows error class', function(){
      expect(deps.element.hasClass('error')).toBe(true);
    });
  }
});

ngDescribe({
  name: 'Angular-progress indicator hide option',
  modules: 'platanus.progress',
  exposeApi: true,
  parentScope: { progressData: { loaded: 0, total: 10000 } },
  element: '<progress hide-on-zero="true" progress-data="progressData"></progress>',

  tests: function (deps, describeApi) {
    it('hides element hide on zero option set', function () {
      expect(deps.element.hasClass('ng-hide')).toBe(true);
    });

    describe('when hide option not set', function(){
      beforeEach(function(){
        describeApi.setupElement('<progress progress-data="progressData"></progress>');
      });

      it('element should be visible', function () {
        expect(deps.element.hasClass('ng-hide')).toBe(false);
      });
    });
  }
});

ngDescribe({
  name: 'Angular-progress indicator hide on complete option',
  modules: 'platanus.progress',
  parentScope: { progressData: { loaded: 10000, total: 10000 } },
  inject: ['$timeout'],
  element: '<progress hide-on-complete="true" progress-data="progressData"></progress>',

  tests: function (deps) {
    it('hides element hide option set', function () {
      deps.$timeout.flush();
      expect(deps.element.hasClass('ng-hide')).toBe(true);
    });
  }
});

ngDescribe({
  name: 'Angular-progress bar',
  modules: 'platanus.progress',
  exposeApi: true,
  parentScope: { progressData: { loaded: 3500, total: 10000 } },
  element: '<progress type="bar" progress-data="progressData"></progress>',

  tests: function (deps) {
    it('render progress bar', function() {
      expect(deps.element.text()).toBe('');
    });

    it('shows inner-bar', function() {
      expect(deps.element.html()).toMatch('inner-bar');
    });
  }
});
