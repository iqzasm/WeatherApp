import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  error: {
    color: 'red',
    fontWeight: 'bold',
  },
  textHighlight: {
    color: '#93B7CC',
    fontWeight: 'bold',
    fontSize: 24,
  },
  parent: {
    backgroundColor: '#132434',
    flex: 1,
    alignItems: 'center',
  },
  weatherDetailsList: {
    // backgroundColor: 'red',
    display: 'flex',
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherDetailsListItem: {
    // backgroundColor: '#172',
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clockText: {
    fontSize: 48,
    color: '#267DBD',
  },
  cityText: {
    fontSize: 48,
    color: '#93B7CC',
  },
  weatherText: {
    fontSize: 16,
    color: '#93B7CC',
  },
});
