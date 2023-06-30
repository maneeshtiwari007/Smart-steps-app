import { StyleSheet } from "react-native";

export const ThemeStyling = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    padding: 15,
    textAlign: 'center',
    minHeight: '100%',
    justifyContent: "center",
    fontFamily:'Inter_400Regular',
  },
  bgLogin: {
    // height: '55%',
  },
  imagecontainer: {
    height: 80,
    marginBottom: 40,
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: 250,
    resizeMode: 'contain',
  },
  heading3: {
    fontSize: 22,
    marginBottom: 0,
    textAlign: 'center',
    fontFamily: 'Inter_600SemiBold',
    fontWeight: '600',
    color: '#fff',
    textTransform: "uppercase",
  },
  heading4: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    fontWeight: '600',
    color: '#fff',
    textTransform: "uppercase",
    textAlign: 'center',
    marginBottom: 10,
  },
  formgroup: {
    flex: 1,
    flexDirection: 'row',
    position: "relative",
  },
  inputIcon: {
    color: '#000',
    position: "absolute",
    left: 15,
    zIndex: 9,
    top: 17,
  },
  formcontrol: {
    flex: 1,
    height: 45,
    borderRadius: 100,
    borderColor: '#fff',
    color: '#fff',
    borderStyle: 'solid',
    padding: 10,
    paddingLeft: 25,
    borderWidth: 1,
  },
  inputbtn:{
    position: 'absolute',
    top: 15, 
    right: 32,
  },
  textTmc: {
    flex: 1,
    marginBottom: 25
  },
  btncontainer: {
    flex: 1,
    marginBottom: 25,
    textAlign: "center",
    alignItems:'center'
  },
  btnprimary: {
    backgroundColor: '#ffcc00',
    borderRadius: 100,
    padding: 12,
    textAlign: "center",
    height: 50,
    width:'90%'
  },
  btnText: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    fontWeight: '600',
    textTransform: 'capitalize',
    color: '#000000',
  },
  fixedbottom: {
    justifyContent: "center",
    alignItems: "center"
  },
  btnprimarydisable:{
    backgroundColor: '#898576',
  }
});
