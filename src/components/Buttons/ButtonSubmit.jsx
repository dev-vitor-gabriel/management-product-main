
import { Container, Button, Loading } from "./style";


export default function ButtonSubmit({ handleSubmit, loading, children }) {
    return (
        <Container>
            <Button onClick={handleSubmit} disabled={loading}>
                {loading ? <Loading /> : children}
            </Button>
        </Container>
    )
}