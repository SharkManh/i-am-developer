import { Pressable, StyleSheet, Text, View, Image, Dimensions, ScrollView } from 'react-native'
import React from 'react'
import { Bungee_400Regular } from '@expo-google-fonts/bungee';
import { Inter_400Regular, Inter_500Medium, Inter_700Bold, Inter_800ExtraBold } from '@expo-google-fonts/inter';
import { useFonts } from 'expo-font';
import BackButton from '../../../assets/games/taixiu/icon/backbutton.png';
import profilePicture from '../../../assets/job/profile_pic.png';
import jobPicture from '../../../assets/job/com_meta.png';
import hasNotificationIcon from '../../../assets/job/hasNotiIcon.png';
import careerImage from '../../../assets/job/career_img.png';
import { useNavigation } from '@react-navigation/native';

//Current Job Data
const jobName = "FE Developer";
const jobCompanyName = "Meta";
const companyImage = jobPicture;
const currentJob = {
          jobName: jobName,
          jobCompanyName: jobCompanyName,
          jobCompanyImage: companyImage
}
//Main Screen Component
const JobMainScreen = () => {
          let [fontsLoaded] = useFonts({
                    Inter_800ExtraBold,
          });
          if (!fontsLoaded) {
                    return null;
          }
          const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <JobScreenHeader title="CAREER MANAGEMENT" onLeave={() => alert('leaving ..')} />
          <View>
                    <JobScreenProfile 
                              profilePicture={profilePicture} 
                              profileName="Lâm Đức Mạnh" 
                              hasNotification={true} 
                    />
          </View>
          <ScrollView>
                    <View style={styles.infoContainer}>
                              <Text style={{fontFamily: 'Inter_800ExtraBold', fontSize: 20}}>
                                        Current Jobs
                              </Text>
                              <CurrentJob 
                                        jobPicture={currentJob.jobCompanyImage} 
                                        jobName={currentJob.jobName} 
                                        jobCompanyName={currentJob.jobCompanyName}
                                        onWork={() => {}} 
                                        onFindJob={() => navigation.navigate('JobOffersScreen')} 
                              />
                    </View>
                    <View style={styles.infoContainer}>
                              <Text style={{fontFamily: 'Inter_800ExtraBold', fontSize: 20}}>
                                        Find Jobs
                              </Text>
                              <ExploreJobs 
                                        careerImage={careerImage} 
                                        careerName="Developer" 
                                        numberOfWorkingPeople={"12,302"} 
                                        onExplore={() => navigation.navigate('JobOffersScreen')} 
                              />
                    </View>
          </ScrollView>
    </View>
  )
}

export default JobMainScreen;

const styles = StyleSheet.create({
          container: {
                    height: '100%',
                    flex: 1,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    // padding: 10
          },   
          scrollView: {
                    width: '100%',
                    height: 'auto',
                    flex: 1,
                    justifyContent: 'space-between',
                    alignItems: 'center',
          },
          infoContainer: {
                    flex: 1,
                    width: '100%',
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 16
          }
}
);

//Header Component
export const JobScreenHeader = ({ title, onLeave }) => {
          let [fontsLoaded] = useFonts({
                    Bungee_400Regular,
                  });
          if (!fontsLoaded) {
                    return null;
          }

          const handleLeave = () => {
                    onLeave();
          }
  return (
    <View style={headerStyle.container}>
          <Pressable style={headerStyle.spacer} onPress={() => handleLeave()}>
                    <Image source={BackButton} />
          </Pressable> 
          <Text style={{
                    flex: 1,
                    fontFamily: 'Bungee_400Regular', 
                    fontSize: 30, 
                    color: '#54C3EE',
                    textAlign: 'center',
                    height: 'auto',
                    textShadowOffset: { width: 1, height: 1 }, 
                    textShadowRadius: 2, 
                    // textShadowColor: 'rgba(0, 0, 0, 0.4)',
                    textShadowColor: 'black',
                    flexWrap: 'wrap',
                    
                    
          }}>
                    {title}
          </Text>
          <View style={headerStyle.spacer}>

          </View>
    </View>
  )
}

const headerStyle = StyleSheet.create({
          container: {
                    // flex: 1,
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                    paddingVertical: 20,
                    backgroundColor: '#FFF6DE'
          },
          spacer: {
                    width: '10%',
                    height: 'auto'
          }
})

//Profile Component
const JobScreenProfile = ({ profilePicture, profileName, hasNotification }) => {
          let [fontsLoaded] = useFonts({
                    Inter_800ExtraBold,
                    Inter_500Medium
                  });
          if (!fontsLoaded) {
                    return null;
          }
  
          return (
    <View style={profileStyle.container}>
          <View style={profileStyle.profileDiv}>
                    <Image source={profilePicture} style={profileStyle.profilePicture} />
          </View>
          <View style={profileStyle.textDiv}>
          <Text style={{
                    fontFamily: 'Inter_500Medium',
                    fontSize: 16,
                    textAlign: 'left'
          }}>
                    Let's Work
          </Text>
          <Text style={{
                    fontFamily: 'Inter_800ExtraBold',
                    fontSize: 20,
                    textAlign: 'left'
          }}>
                    {profileName}
          </Text>
          </View>
          <View>
                    <Image source={hasNotification && hasNotificationIcon} />
          </View>
    </View>
  )
}

const twoByTenDimWidth = Dimensions.get('window').width / 5;

const profileStyle = StyleSheet.create({
          container: {
                    width: '100%',
                    height: Dimensions.get('window').height / 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 30,
                    paddingVertical: 10,
          },
          profileDiv: {
                    width: twoByTenDimWidth,
                    height: twoByTenDimWidth,
                    borderRadius: 200,
                    backgroundColor: 'black',
                    alignItems: 'center',
                    alignContent: 'center',
                    justifyContent: 'center',
          },
          profilePicture: {
                    width: twoByTenDimWidth * 0.8,
                    height: twoByTenDimWidth,
                    borderRadius: 200,
          },  

});

//Current Job Component
const CurrentJob = ({ jobPicture, jobName, jobCompanyName, onWork, onFindJob }) => {
          let [fontsLoaded] = useFonts({
                    Inter_700Bold,
                    Inter_500Medium,
                    Inter_400Regular
          });

          if (!fontsLoaded) {
                    return null;
          }
          const handleWork = () => {
                    onWork();
          }
          const handleFindJob = () => {
                    onFindJob();
          }

          if(!jobName) {return (
                    <View style={currentJobStyle.container2}>
                              <Text style={{
                                        fontFamily: 'Inter_700Bold',
                                        fontSize: 25,
                                        color: '#fff'
                              }}>
                                        You have no jobs
                              </Text>
                              <Pressable onPress={() => handleFindJob()} style={currentJobStyle.workButton}>
                                        <Text style={{
                                        fontFamily: 'Inter_700Bold',
                                        fontSize: 16,
                                        
                              }}>
                                                  Find job now
                                        </Text>
                              </Pressable>
                    </View>
          )}
          else{
                    return (
                              <View style={currentJobStyle.container}>
                                        <View style={currentJobStyle.imageContainer}>
                                                  <Image style={currentJobStyle.companyImage} source={jobPicture} />
                                        </View>
                                        <View>
                                                  <Text style={{
                                                            fontFamily: 'Inter_700Bold',
                                                            fontSize: 25,
                                                            color: '#fff'
                                                  }}>
                                                            {jobName}
                                                  </Text>
                                                  <Text style={{
                                                            fontFamily: 'Inter_400Regular',
                                                            fontSize: 16,
                                                            color: '#fff'
                                                  }}>
                                                            {jobCompanyName}
                                                  </Text>
                                        </View>
                                        <Pressable onPress={() => handleWork()} style={currentJobStyle.workButton}>
                                                  <Text
                                                  style={{
                                                            fontFamily: 'Inter_700Bold',
                                                            fontSize: 16
                                                  }}
                                                  >
                                                            Work
                                                  </Text>
                                        </Pressable>
                              </View>
                    )
          
          }
}

const twoByTenDimHeight = Dimensions.get('window').height / 7;

const currentJobStyle = StyleSheet.create({
          container: {
                    width: '100%',
                    height: twoByTenDimHeight,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    backgroundColor: '#0A0932',
                    borderRadius: 16
          },
          imageContainer: {
                    width: 60,
                    height: 60,
                    borderRadius: 200,
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    alignContent: 'center',
                    justifyContent: 'center',
          },
          workButton: {
                    padding: 6,
                    width: 'auto',
                    height: 'auto',
                    borderRadius: 20,
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    alignContent: 'center',
                    justifyContent: 'center',
                    alignSelf: 'end'
          },
          container2: {
                    width: '100%',
                    height: twoByTenDimHeight,
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    backgroundColor: '#0A0932',
                    borderRadius: 20
          }
});

//Explore Jobs Component
const ExploreJobs = ({ careerImage, careerName, numberOfWorkingPeople, onExplore }) => {
          let [fontsLoaded] = useFonts({
                    Inter_700Bold,
                    Inter_400Regular
          });

          if (!fontsLoaded) {
                    return null;
          }

          const handleExplore = (job) => {
                    onExplore(job);
          }

          return (
                    <View style={exploreJobsStyle.container}>
                              <View>
                                        <Image source={careerImage} />
                              </View>
                              <Text style={{
                                        fontFamily: 'Inter_700Bold',
                                        fontSize: 25,
                                        color: '#fff'
                              
                              }}>
                                        {careerName}
                              </Text>
                              <Text style={{
                                        fontFamily: 'Inter_400Regular',
                                        fontSize: 16,
                                        color: '#8D8DA6'
                              }}>
                                        {numberOfWorkingPeople + " people are working"}
                              </Text>
                              <Pressable style={exploreJobsStyle.button}>
                                        <Text style={{
                                                  fontFamily: 'Inter_700Bold',
                                                  fontSize: 16,
                                        }} onPress={() => handleExplore()}>
                                                  Explore
                                        </Text>
                              </Pressable>
                    </View>
          )
}

const exploreJobsStyle = StyleSheet.create({
          container: {
                    flex: 1,
                    width: '100%',
                    height: Dimensions.get('window').height / 4,
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    backgroundColor: '#0A0932',
                    borderRadius: 16
          },
          button: {
                    paddingHorizontal: 20,
                    paddingVertical: 6,
                    width: 'auto',
                    height: 'auto',
                    borderRadius: 16,
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    alignContent: 'center',
                    justifyContent: 'center',
          }
});

