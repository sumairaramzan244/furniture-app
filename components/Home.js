import { View, Image, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';


import Bedroom from "./Bedroom";
import Living from "./Living";
import Kitchen from "./Kitchen";
import Study from "./Study";
import Outdoor from "./Outdoor";
import Footer from './Footer';

const images = [
  {
    image: require('../assets/12.jpg'),
    description: 'Breathe Fresh air',
    description1: 'OUTDOORS',
    button: 'View Collection',
    screen: 'Outdoor',
  },
  {
    image: require('../assets/14.jpg'),
    description: 'Cozy, Comforting haven',
    description1: 'BEDROOM',
    button: 'View Collection',
    screen: 'Bedroom',
  },
  {
    image: require('../assets/15.jpg'),
    description: 'Warm, inviting lounge',
    description1: 'LIVING ROOM',
    button: 'View Collection',
    screen: 'Living',
  },
];

const locations = [
  { text: 'NAKHEEL MALL, PALM JUMERIAH, DUBAI' },
  { text: 'YAS MALL, ABU DHABI' },
  { text: 'EBARZA OUTLET, KEZAD' },
];

const reviews = [
  {
    image: require('../assets/111.jpg'),
    name: 'John Doe',
    review: 'Great quality furniture! Totally satisfied.',
  },
  {
    image: require('../assets/111.jpg'),
    name: 'Jane Smith',
    review: 'The comfort and style are unbeatable!',
  },
  {
    image: require('../assets/111.jpg'),
    name: 'Michael Lee',
    review: 'Beautiful designs, will definitely buy again!',
  },
];
 const items = [
    {
      image: require('../assets/17.jpg'),
      title: 'Bedroom',
      screen: 'Bedroom',
    },
    {
      image: require('../assets/16.jpg'),
      title: 'Living',
      screen: 'Living',
    },
   
    {
      image: require('../assets/18.jpg'),
      title: 'Study',
      screen: 'Study',
    },
    {
      image: require('../assets/19.jpg'),
      title: 'Kitchen',
      screen: 'Kitchen',
    },
  ];

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.row}>
          <View style={styles.Circlebutton}>
            <TouchableOpacity
              style={styles.Circlebuttonimage}
              onPress={() => navigation.navigate('Bedroom')}
            >
              <Image source={require('../assets/17.jpg')} style={styles.circleimage} />
              <Text style={styles.buttonText}>Bedroom</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.Circlebutton}>
            <TouchableOpacity
              style={styles.Circlebuttonimage}
              onPress={() => navigation.navigate('Living')}
            >
              <Image source={require('../assets/16.jpg')} style={styles.circleimage} />
              <Text style={styles.buttonText}>Living</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.Circlebutton}>
            <TouchableOpacity
              style={styles.Circlebuttonimage}
              onPress={() => navigation.navigate('Study')}
            >
              <Image source={require('../assets/18.jpg')} style={styles.circleimage} />
              <Text style={styles.buttonText}>Study</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.Circlebutton}>
            <TouchableOpacity
              style={styles.Circlebuttonimage}
              onPress={() => navigation.navigate('Kitchen')}
            >
              <Image source={require('../assets/19.jpg')} style={styles.circleimage} />
              <Text style={styles.buttonText}>Kitchen</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.swiperContainer}>
          <Swiper showsButtons={true} buttonWrapperStyle={styles.buttonWrapper}>
            {images.map((img, index) => (
              <View key={index} style={styles.slide}>
                <Image source={img.image} style={styles.image} />
                <View style={styles.overlay}>
                  <Text style={styles.imageText}>{img.description}</Text>
                  <Text style={styles.imageText1}>{img.description1}</Text>
                  <TouchableOpacity
                    style={styles.imageButton}
                    onPress={() => navigation.navigate(img.screen)}
                  >
                    <Text style={styles.buttonText}>{img.button}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </Swiper>
        </View>

        <View style={styles.review}>
          <Text style={styles.reviewTitle}> CLIENT'S REVIEW </Text>
          <View style={styles.review1}>
            {reviews.map((review, index) => (
              <View key={index} style={styles.reviewView}>
                <Image source={review.image} style={styles.reviewImage} />
                <Text style={styles.reviewName}>{review.name}</Text>
                <Text style={styles.reviewReview}>{review.review}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.location}>
          <Text style={styles.header}>SHOWROOMS:</Text>
          {locations.map((location, index) => (
            <View key={index} style={styles.locationContainer}>
              <Image source={require('../assets/location.jpg')} style={styles.icon} />
              <Text style={styles.locationText}>{location.text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Footer navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 60, 
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'darkgrey',
    paddingVertical: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  Circlebutton: {
    width: 70,
    height: 70,
    borderRadius: 40,
    backgroundColor: '#3498db',
    margin: 10,
    marginBottom: 40,
  },
  Circlebuttonimage: {
    alignItems: 'center',
  },
  circleimage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    resizeMode: 'cover',
  },
  swiperContainer: {
    marginTop: 10,
    height: 400,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
  },
  image: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: '35%',
    alignItems: 'center',
  },
  imageText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
    marginBottom:10,
  },
  imageText1: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 25,
  },
  imageButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  review: {
    paddingVertical: 15,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  
  },
  reviewTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  review1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: '100%',
    paddingHorizontal: 10,
  
  },
  reviewView: {
    width: '30%', // Adjust this based on spacing and width needed
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5, 
    borderColor:'black', 
    borderWidth:1
  },
  reviewImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  reviewName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewReview: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
  },
  divider: {
    height: 2,
    backgroundColor: '#95a5a6',
    marginVertical: 20,
    width: '90%',
    alignSelf: 'center',
  },
  location: {
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  locationText: {
    fontSize: 16,
  },
});

export default Home;
