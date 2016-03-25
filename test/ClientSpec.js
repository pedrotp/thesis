var React = require('react-native');
var View = React.View;
var Text = React.Text;
var Navigator = React.Navigator
var shallow = require('enzyme').shallow;
var mount = require('enzyme').mount;
var expect = require('chai').expect;

// Loading component dependency
var Loading = require('../app/components/Loading');

// CreateContainer dependencies
var Create = require('../app/components/Create').Create;
var AddHabits = require('../app/containers/CreateContainer');

// Create component dependencies
var TextField = require('../app/components/Create').TextField;
var Frequency = require('../app/components/Create').Frequency;
var SubmitButton = require('../app/components/Create').SumbitButton;

// InboxContainer dependencies
var Inbox = require('../app/components/Inbox').Inbox;
var Habits = require('../app/containers/InboxContainer');


describe('<Loading />', function() {
  it('it should render 1 view component', function () {
    var wrapper = shallow(<Loading />);
    expect(wrapper.find(View)).to.have.length(1);
  });

  it('it should render 1 text component', function () {
    var wrapper = shallow(<Loading />);
    expect(wrapper.find(Text)).to.have.length(1);
  });
});

describe('<AddHabits />', function() {

  it('it should render a view component', function () {

    var wrapper = shallow(<AddHabits navigator={{}} />);
    expect(wrapper.find(View)).to.have.length(1);
  });

  it('it should contain a navigator component', function () {

    var wrapper = shallow(<AddHabits navigator={{}} />);
    expect(wrapper.find(Navigator)).to.have.length(1);

  });
  it('it should have an object property type', function() {

    var wrapper = mount(<AddHabits navigator={{}} />);
    expect(wrapper.props().navigator).to.be.an('object');
  });

  it('it should have a navigation bar', function () {
    var wrapper = shallow(<AddHabits navigator={{}} />);
    var navigator = wrapper.find('Navigator');
    expect(navigator.props().navigationBar).to.exist;
  });
});

describe('<Create />', function() {
  it('it should render form controls', function () {

    var fields = {
      action: 'Floss'
    }

    var wrapper = shallow(<Create fields={fields} handleClick={function(){}} />);

    expect(wrapper.find(View)).to.have.length(2);
    expect(wrapper.find(TextField)).to.have.length(1);
    expect(wrapper.find('SubmitButton')).to.have.length(1);
  });

});
