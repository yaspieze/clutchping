import { mount } from '../mount';
import { Layout } from '../components/Layout';
import { Post } from '../pages/Post';
import { postBySlug } from '../data/posts';
const post = postBySlug('ping-lag')!;
mount(<Layout active="blog"><Post post={post} /></Layout>);
