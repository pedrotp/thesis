var React = require('react-native');
var ProgressBar = require('react-native-progress-bar');
var View = React.View;
var Text = React.Text;
var Image = React.Image;
var ListView = React.ListView;
var StyleSheet = React.StyleSheet;
var TouchableOpacity = React.TouchableOpacity;

var Profile = React.createClass({
  getInitialState: function () {
    var ds = new ListView.DataSource({
      rowHasChanged: function (row1, row2) {
        return row1 !== row2;
      }
    });
    var mocks = [];
    for (var i = 0; i < 4; i++) {
      mocks.push('Image');
    }
    return {
      progress: 0.75,
      dataSource: ds.cloneWithRows(mocks)
    }
  },
  componentDidMount: function () {

    // Progress bar doesn't appear filled unless it's changed
    // so upon component mount, add and subtract trivial amount
    this.setState({ progress: this.state.progress + 0.00001 });
    this.setState({ progress: this.state.progress - 0.00001 });
  },
  renderRow: function (rowData, sectionID, rowID) {
    return (
      <TouchableOpacity onPress={
          function () {
            console.log('rowData:', rowData);
            console.log('sectionID:', sectionID);
            console.log('rowID:', rowID);
          }
        }>
        <View style={styles.recentBadges}>
          <Text>
            {rowData}
          </Text>
        </View>
      </TouchableOpacity>
    );
  },
  render: function () {
    return (
      <View>
        <TouchableOpacity>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              Add Photo
            </Text>
          </View>
        </TouchableOpacity>
        <View>
          <Text>
            Recently Earned Badges
          </Text>
          <ListView
            contentContainerStyle={styles.recentBadges}
            dataSource={this.state.dataSource}
            initialListSize={4}
            pageSize={4}
            renderRow={this.renderRow}
            scrollEnabled={false}
            automaticallyAdjustContentInsets={false}
          />
        </View>
        <View>
          <Text style={styles.headers}>
            1 more completion for Awesome Badge
          </Text>
          <ProgressBar
            fillStyle={styles.progressFill}
            backgroundStyle={styles.progress}
            style={{marginTop: 10, width: 300, height: 10}}
            progress={this.state.progress}
            />
        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  avatar: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    backgroundColor: '#EEE',
    borderRadius: 100/2,
    borderColor: '#FFF',
    borderWidth: 1,
    marginBottom: 80
  },
  avatarText: {
    fontSize: 10,
    width: 60,
    textAlign: 'center'
  },
  headers: {
    alignSelf: 'center',
  },
  list: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  progressFill: {
    backgroundColor: '#6399DC',
    height: 10
  },
  progress: {
    backgroundColor: '#aaa',
    borderRadius: 7,
    alignSelf: 'center'
  },
  recentBadges: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#aaa',
    borderRadius: 4,
    width: 50,
    height: 50,
    padding: 1,
    margin: 1,
  }
});

module.exports = Profile;
