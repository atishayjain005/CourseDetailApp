import test from 'node:test';
import assert from 'node:assert/strict';
import {parseCourse, addCourse, filterCourses} from '../lib/courses.mjs';
const data = {categoryName: ' JavaScript ', categoryDescription: 'A course', status: '1'};
test('normalizes only valid service courses', () => {
  assert.deepEqual(parseCourse({data}), {...data, categoryName:'JavaScript', status:1});
  for (const payload of [null, {}, {data:[]}, {data:{...data, categoryName:' '}}, {data:{...data,status:9}}]) {
    assert.throws(() => parseCourse(payload));
  }
});
test('preserves the existing request contract', async () => {
  const course = await addCourse(async (url, options) => {
    assert.equal(url.origin, 'https://65.1.150.227:5000');
    assert.equal(url.searchParams.get('categoryName'), 'Learn JavaScript');
    assert.equal(options.method, 'POST');
    assert.ok(options.signal instanceof AbortSignal);
    return {ok:true,json:async()=>({data})};
  });
  assert.equal(course.categoryName, 'JavaScript');
});
test('rejects HTTP errors, invalid JSON, network failures and malformed data without retrying', async () => {
  for (const response of [{ok:false,status:503},{ok:true,json:async()=>{throw new Error('invalid JSON');}}, {ok:true,json:async()=>({})}, null]) {
    let calls = 0;
    await assert.rejects(addCourse(async()=>{calls++; if (!response) throw new Error('network'); return response;}), /Could not confirm/);
    assert.equal(calls, 1);
  }
});
test('aborts a stalled request and warns about uncertain remote state', async () => {
  await assert.rejects(addCourse((_url, {signal}) => new Promise((_resolve,reject) => {
    signal.addEventListener('abort', () => reject(new Error('abort')));
  }), 5), /may have been saved remotely/);
});
test('combines search and status without mutating course order', () => {
  const courses = [{...data,status:1},{categoryName:'Other',categoryDescription:'JavaScript basics',status:0}];
  assert.equal(filterCourses(courses,{query:' JAVASCRIPT ',status:'0'}).length,1);
  assert.deepEqual(filterCourses(courses,{sort:'new'}),[courses[1],courses[0]]);
  assert.deepEqual(filterCourses(courses,{query:'missing'}),[]);
  assert.equal(courses[0].categoryName,data.categoryName);
  assert.equal(filterCourses(courses).length,2);
});
