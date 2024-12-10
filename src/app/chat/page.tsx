// import ChatArea from "@/components/Chatarea";
// import Header from "@/components/Header";
import ChatComponent from "@/components/Chatarea";
import { Container } from "@/components/Container";
export default function Home() {
    return (
        <section
            id="secondary-features"
            aria-label="Features for analyzing code plagiarism and performance"
            className="pb-14 pt-20 sm:pb-20 sm:pt-32 lg:pb-32"
        >
            <Container className="relative">

                {/* <Header name="BOT" /> */}
                <ChatComponent />
            </Container>
        </section>
    );
}
