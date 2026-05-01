import { getTools } from './lib/actions/arsenal.actions';

async function test() {
  try {
    const result = await getTools({} as any);
    console.log(result);
  } catch (err) {
    console.error(err);
  }
}

test();
