/* eslint-disable react-native/no-inline-styles */
import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types';
import { useDispatch, useSelector } from 'react-redux';
import { actions, selectors } from 'store';
import { Comments } from 'types/interfaces';
import { ScrollView, Swipeable, TextInput } from 'react-native-gesture-handler';
import { Field, Form } from 'react-final-form';
import Input from 'components/Input';
import { composeValidators, minLength, required } from 'utils/validation';
import moment from 'moment';

const Details = ({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'Details'>) => {
  const dispatch = useDispatch();

  const comments = useSelector(selectors.comments.selectComments);
  const prays = useSelector(selectors.pray.selectPrayes);

  const [members, setMembers] = useState(['0']);
  const [countPrays, setPrays] = useState(0);
  const [lastPrayed, setLastPrayed] = useState<Date>();
  const [calculatedTime, setCalculatedTime] = useState<string>();

  const getComments = async () => {
    const res = await dispatch(actions.comments.getComments());
    console.log('getting comments', res);
  };

  const swipeFromRightOpen = async (commentId: number) => {
    const res = await dispatch(actions.comments.deleteComment(commentId));
    getComments();
  };

  const addPray = async (id: number) => {
    const res = await dispatch(actions.pray.pray(id));
    await setPrays(
      prays.find(pray => pray.prayerId === route.params.id)?.count || 0,
    );
    await setLastPrayed(new Date());
    console.log('countPrays', countPrays);
    getTime();
  };

  const getTime = () => {
    if (lastPrayed) {
      setCalculatedTime(moment(lastPrayed).fromNow());
    }
    console.log('lastPrayed', lastPrayed);
  };

  const rightSwipeActions = () => {
    return (
      <View
        style={{
          backgroundColor: '#AC5253',
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}>
        <Text
          style={{
            color: 'white',
            fontWeight: '600',
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}>
          Delete
        </Text>
      </View>
    );
  };

  const postComment = async (data: { comment: string }) => {
    const res = await dispatch(
      actions.comments.postComment({
        prayerId: route.params.id,
        body: data.comment,
      }),
    );
    console.log('getting comments', res);
    getComments();
  };

  useEffect(() => {
    getComments();
  }, []);

  const Comment = ({ comment }: { comment: Comments }) => (
    <>
      <Swipeable
        renderRightActions={rightSwipeActions}
        onSwipeableRightOpen={() => swipeFromRightOpen(comment.id)}>
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={require('../../assests/img/avatar.png')}
            style={styles.image}
          />
          <View style={{ backgroundColor: 'white' }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.userId}>{`User id: ${comment.userId}`}</Text>
              <Text style={styles.date}>
                {comment.created.toString().split('T')[0]}
              </Text>
            </View>
            <Text style={styles.body}>{comment.body}</Text>
          </View>
        </View>
      </Swipeable>
      <View style={styles.line} />
    </>
  );

  return (
    <>
      <View style={styles.header}>
        <View style={styles.headerButtons}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../../assests/img/back.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => addPray(route.params.id)}>
            <Image source={require('../../assests/img/prayIcon.png')} />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerTitle}>
          Prayer item two which is for my family to love God whole heartedly.
        </Text>
      </View>
      <View style={styles.lastDate}>
        <View style={styles.rectangle} />
        {lastPrayed ? (
          <Text style={styles.postDate}>Last prayed {calculatedTime}</Text>
        ) : (
          <Text style={styles.postDate}>Hasn't prayed yet</Text>
        )}
      </View>
      <View
        style={[
          styles.statsContainer,
          { borderBottomWidth: 0, justifyContent: 'center' },
        ]}>
        <View style={styles.statsString}>
          <Text style={[styles.statsText, { fontSize: 22 }]}>
            {calculatedTime || 'Unknown'}
          </Text>
          <Text style={[styles.statsLabel, { marginTop: 0 }]}>Date added</Text>
          <Text style={styles.statsSemiLabel}>Opened for 4 days</Text>
        </View>
        <View style={styles.statsString}>
          <Text style={styles.statsText}>
            {prays.find(pray => pray.prayerId === route.params.id)?.count ||
              '0'}
          </Text>
          <Text style={styles.statsLabel}>Time prayed total</Text>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statsString}>
          <Text style={styles.statsText}>
            {prays.find(pray => pray.prayerId === route.params.id)?.count ||
              '0'}
          </Text>
          <Text style={styles.statsLabel}>Times prayed by my</Text>
        </View>
        <View style={styles.statsString}>
          <Text style={styles.statsText}>0</Text>
          <Text style={styles.statsLabel}>Times prayed by others</Text>
        </View>
      </View>
      <View style={styles.container}>
        <View>
          <Text style={styles.label}>MEMBERS</Text>
          <ScrollView horizontal>
            <View style={styles.members}>
              {members.map(member => (
                <Image
                  source={
                    member === '1'
                      ? require('../../assests/img/memer0.png')
                      : require('../../assests/img/memer1.png')
                  }
                  style={styles.avatar}
                />
              ))}
              <TouchableOpacity
                style={styles.membersAdd}
                onPress={() => {
                  console.log('members', members);
                  setMembers([...members, String(members.length % 2)]);
                }}>
                <Image source={require('../../assests/img/add.png')} />
              </TouchableOpacity>
            </View>
          </ScrollView>
          <Text style={styles.label}>COMMENTS</Text>
          <View style={styles.line} />
          <ScrollView style={styles.comments}>
            {comments
              .filter(comment => comment.prayerId === route.params.id)
              .map(comment => (
                <Comment key={comment.id} comment={comment} />
              ))}
          </ScrollView>
        </View>
        <Form
          onSubmit={postComment}
          key={0}
          render={({ handleSubmit }) => (
            <View style={styles.commentInput}>
              <TouchableOpacity onPress={handleSubmit}>
                <Image
                  source={require('../../assests/img/comment.png')}
                  style={styles.sendComment}
                />
              </TouchableOpacity>
              <Field
                name="comment"
                validate={composeValidators(required, minLength(6))}>
                {({ input, meta }) => (
                  <Input
                    meta={meta}
                    input={input}
                    placeholder="Add a comment"
                    autoComplete="off"
                    textContentType="none"
                    secureTextEntry={false}
                    style={styles.input}
                    auth
                  />
                )}
              </Field>
            </View>
          )}
        />
      </View>
    </>
  );
};

export default Details;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#BFB393',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  headerTitle: { fontSize: 17, color: '#FFFFFF', paddingBottom: 20 },
  container: { flex: 1, padding: 15, justifyContent: 'space-between' },
  label: {
    color: '#72A8BC',
    fontSize: 13,
    marginBottom: 5,
  },
  date: {
    marginLeft: 10,
    color: '#9C9C9C',
    fontSize: 13,
  },
  postDate: {
    marginLeft: 15,
    marginVertical: 14,
    color: '#514D47',
    fontSize: 17,
  },
  viewBox: {
    borderColor: '#E5E5E5',
  },
  body: {
    marginTop: 1,
    marginBottom: 7,
  },
  members: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    marginBottom: 5,
  },
  membersAdd: {
    height: 32,
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: '#BFB393',
  },
  line: {
    marginVertical: 4,
    height: 1,
    width: '100%',
    backgroundColor: '#E5E5E5',
  },
  input: {
    width: '100%',
    borderWidth: 0,
  },
  comments: {},
  commentInput: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#E5E5E5',
  },
  sendComment: {
    marginLeft: 15,
  },
  image: {
    marginRight: 15,
  },
  userId: {
    fontWeight: '600',
  },
  avatar: {
    height: 34,
    width: 34,
    borderRadius: 50,
    marginRight: 10,
  },
  statsContainer: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    flexDirection: 'row',
    width: '100%',
  },
  statsString: {
    paddingTop: 25,
    paddingHorizontal: 15,
    borderLeftWidth: 1,
    borderColor: '#E5E5E5',
    height: 108,
    width: '50%',
  },
  statsText: {
    color: '#BFB393',
    fontSize: 32,
  },
  statsLabel: {
    fontSize: 13,
    marginTop: 3,
  },
  statsSemiLabel: {
    fontSize: 13,
    color: '#72A8BC',
  },
  rectangle: {
    height: 22,
    width: 3,
    backgroundColor: '#AC5253',
    borderRadius: 50,
    marginLeft: 20,
  },
  lastDate: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
